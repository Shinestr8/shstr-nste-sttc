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
    
    # print("end func")
    # return filename


#preocess the song to predict
def processSong(songData):
    songLength = songData.shape[0]
    chunkSize = 33000
    spectrograms = []
    for i in range(0, songLength, chunkSize):
            signal = np.array(songData[i:i+chunkSize])#load a chunk
            if(len(signal) != chunkSize): #check the size of the chunk
                continue
            #add the spectrogram of the chunk to the array
            spectrograms.append(librosa.feature.melspectrogram(y=signal, n_fft=1024, hop_length=256, n_mels=128)[:,:,np.newaxis])
            #add the genre matching the spectrogram to the array
    spectrograms = np.array(spectrograms)
    return spectrograms

# def processInChunk():


def predictInChunk(url):
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]
    filename = str("tmp/" + video_id + ".mp3")
    signal, sr = librosa.load(filename)
    # if(signal.shape[0] > 13200000):
    #     print("Song is too long")
    #     return
    chunksize_minutes=2
    step = int(((chunksize_minutes*60)/1.5)*33000)
    subdivs = signal.shape[0]//step
    rest = signal.shape[0]%step
    
    CNN = tf.keras.models.load_model('python/models2/GTZANPretrainedCNN.h5') #load the model
    # print(signal.shape[0])
    # print(subdivs)
    totalUnique = np.array([], dtype=int)
    totalCounts = np.array([], dtype=int)
    for i in range(0, subdivs, 1):
        
        start = i*step
        end = start + step
        melspec = processSong(signal[start:end])
        prediction = np.argmax(CNN.predict(melspec), axis=-1) #predict the classes
        
        newUnique, newCounts = np.unique(prediction, return_counts=True)
        totalUnique, idx = np.unique(np.hstack((totalUnique, newUnique)), return_inverse=True)
        totalCounts = np.bincount(idx, np.hstack((totalCounts, newCounts)))
        # print(newUnique, newCounts)
        # print(totalUnique, totalCounts)
        del melspec
        del newUnique
        del newCounts

    melspec = processSong(signal[subdivs*step:subdivs*step+rest])
    prediction = np.argmax(CNN.predict(melspec), axis=-1) #predict the classes
    
    newUnique, newCounts = np.unique(prediction, return_counts=True)
    totalUnique, idx = np.unique(np.hstack((totalUnique, newUnique)), return_inverse=True)
    totalCounts = np.bincount(idx, np.hstack((totalCounts, newCounts)))
    totalCounts = totalCounts.astype(int)
    # labels = genres
    total = 0
    higherGuess = np.argmax(totalCounts)
    bestGuess = genres[totalUnique[higherGuess]]
    array = []
    for i in range(len(totalUnique)):
        array.append({"name": genres[totalUnique[i]], "count": totalCounts[i]})

    for c in totalCounts:
        total = total + c


    result = {
        "guess": array,
        "higherGuess": bestGuess,
        "total": total,
        "message": "success"
    }

    print(result)

    # labels = []
    # for i in totalUnique:
    #     labels.append(genres[i])
    
    # zip_iterator = zip(labels, totalCounts)
    # print(dict(zip_iterator))



    #calculate percentage
    
    # for genre, count in zip(totalUnique, totalCounts):
    #     stat = (count/total) * 100
    #     print(labels[genre], " : ", "%.2f" % stat , "%")
    
    # print(subdivs+1, "\nmost probable : ", labels[totalUnique[higherGuess]])
    del melspec
    
def main():
    # song="https://www.youtube.com/watch?v=NCWCVhIUigw"
    song = sys.argv[1]
    # song = "https://www.youtube.com/watch?v=lgh68Swuak0" #pachelbel, the nemesis
    # song = "https://www.youtube.com/watch?v=7f1raKLLI5I" #7m10
    # song = "https://www.youtube.com/watch?v=QxbJSe6ueoY" #10min
    downloadSong(song)
    predictInChunk(song)


if __name__ == '__main__':
    main()

["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "metal"]