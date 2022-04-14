import librosa
import numpy as np
import tensorflow as tf
import yt_dlp
import sys 
# import shutil
import os


#model name
modelName = 'GTZANPretrainedCNN.h5'
genres = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
genres.sort()

def clean(url):
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]
    filename = str("tmp/" + video_id + ".m4a")
    os.remove(filename)


def downloadSong(url):
    # orig_ext = ".webm"
    video_url = url.split("&")[0]
    video_id = video_url.split("=")[1]

    video_info = yt_dlp.YoutubeDL().extract_info(
        url = video_url,download=False
    )

    if(int(video_info["duration"]) > 600 ):
        result = {"message": "song is too long"}
        print(result)
        sys.exit(0)

    filename = str("tmp/" + video_id + ".m4a")
    # filename = 'tmp/music'

    # options={
    #     'format': 'bestaudio/best',
    #     'postprocessors': [{
    #         'key': 'FFmpegExtractAudio',
    #         'preferredcodec': 'mp3',
    #         'preferredquality': '192'
    #     }],
    #     'keepvideo':False,
    #     'outtmpl':filename + orig_ext,
    # }
    options={
        'format':'m4a',
        'keepvideo':False,
        'outtmpl':filename,
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
    filename = str("tmp/" + video_id + ".m4a")
    signal, sr = librosa.load(filename)
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

    if(rest > 33000):
        melspec = processSong(signal[subdivs*step:subdivs*step+rest])
        prediction = np.argmax(CNN.predict(melspec), axis=-1) #predict the classes
        del melspec

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
    # del melspec
    
def main():
    ytURL = sys.argv[1]
    # ytURL = 'https://www.youtube.com/watch?v=uczY1We-Eak'
    downloadSong(ytURL)
    
    predictInChunk(ytURL)  
    clean(ytURL)
    


if __name__ == '__main__':
    main()
