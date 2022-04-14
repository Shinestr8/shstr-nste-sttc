from re import M
import librosa
import numpy as np
import tensorflow as tf
import yt_dlp
import sys 

#model name
modelName = 'GTZANPretrainedCNN.h5'
genres = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
genres.sort()


def downloadSong(url):
    orig_ext = ".webm"
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]

    video_info = yt_dlp.YoutubeDL().extract_info(
        url = video_url,download=False
    )


    filename = str("tmp/" + video_id)
    # filename = 'tmp/music'

    options={
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192'
        }],
        'keepvideo':False,
        'outtmpl':filename + orig_ext,
    }

    with yt_dlp.YoutubeDL(options) as ydl:
        ydl.download([video_info['webpage_url']])
    
    print("end func")
    # return filename


#preocess the song to predict
def processSong(songData):
    songLength = songData.shape[0]
    chunkSize = 33000
    spectrograms = []
    for i in range(0, songLength//3, chunkSize):
            signal = np.array(songData[i:i+chunkSize])#load a chunk
            if(len(signal) != chunkSize): #check the size of the chunk
                continue
            #add the spectrogram of the chunk to the array
            spectrograms.append(librosa.feature.melspectrogram(signal, n_fft=1024, hop_length=256, n_mels=128)[:,:,np.newaxis])
            #add the genre matching the spectrogram to the array
    spectrograms = np.array(spectrograms)
    return spectrograms


#Function that loads the model and predict a song
def predictGenre(url):
    # video_url = url.split("&")[0]
    # video_id = video_url.split("=")[1]
    # filename = str("tmp/" + video_id)
    # filename = "tmp/music.mp3"
    # print("Predicting genre for ", filename + ".mp3")
    # filename = "music/Ladida"
    print("0")
    signal, sr = librosa.load("music/Ladida.mp3") #loading the file
    print(1)
    melspec = processSong(signal) #process the file into melspec of shape (128, 129, 1)
    CNN = tf.keras.models.load_model('python/models2/GTZANPretrainedCNN.h5') #load the model
    prediction = np.argmax(CNN.predict(melspec), axis=-1) #predict the classes
    # print("\nsong is composed of " + str(len(prediction)) + " segments")
    
    #retrieve genre and count for each genre
    unique, counts = np.unique(prediction, return_counts=True)
    labels = genres
    total = 0
    higherGuess = np.argmax(counts)
    
    #calculate percentage
    for c in counts:
        total = total + c
    
    for genre, count in zip(unique, counts):
        stat = (count/total) * 100
        # print(labels[genre], " : ", "%.2f" % stat , "%")
    
    print("\nmost probable : ", labels[unique[higherGuess]])
    


# predictGenre()    
# song = "https://www.youtube.com/watch?v=6bquIwXzvW8"
# downloadSong(song)
# print("download over calling predictGenre")
# predictGenre(song)
# predictGenre()

def predict(url):
    print("predict")
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]
    filename = str("tmp/" + video_id + ".mp3")
    print(filename)
    signal, sr = librosa.load(filename)
    print("librosaed")

    ### doesnt work after that for long song
    melspec = processSong(signal)
    print("processed")
    CNN = tf.keras.models.load_model('python/models2/GTZANPretrainedCNN.h5') #load the model
    print("model loaded")
    prediction = np.argmax(CNN.predict(melspec), axis=-1) #predict the classes
    print("predicted")
    unique, counts = np.unique(prediction, return_counts=True)
    labels = genres
    total = 0
    higherGuess = np.argmax(counts)
    
    #calculate percentage
    for c in counts:
        total = total + c
    
    for genre, count in zip(unique, counts):
        stat = (count/total) * 100
        print(labels[genre], " : ", "%.2f" % stat , "%")
    
    print("\nmost probable : ", labels[unique[higherGuess]])

def predict2(url):
    print("predict")
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]
    filename = str("tmp/" + video_id + ".mp3")
    print(filename)
    signal, sr = librosa.load(filename)
    print("librosaed")
    melspec = processSong(signal)
    print("processed")
    

def test():
    print(modelName)

def main():
    test()
    song = "https://www.youtube.com/watch?v=lgh68Swuak0" #pachelbel, the nemesis
    # song = "https://www.youtube.com/watch?v=6bquIwXzvW8" #long
    # song = "https://www.youtube.com/watch?v=jeI992mvlEY" #short, works
    downloadSong(song)
    print(song)
    test()
    predict(song)
    test()

if __name__ == '__main__':
    main()

["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "metal"]