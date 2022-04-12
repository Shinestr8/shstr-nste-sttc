import os
import librosa
import numpy as np
# import matplotlib.pyplot as plt
import logging
logging.captureWarnings(False)
# binPath = os.getcwd() + '\libav' + "\\" + "usr" + '\\bin' #bin folder location of libav
# PATH = os.environ.get('PATH') #curent PATH
# os.environ['PATH'] = PATH + ";" + binPath #update PATH

# print(binPath)

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # FATAL
# logging.getLogger('tensorflow').setLevel(logging.FATAL)
import tensorflow as tf

useDefault = True


#model name
if useDefault == True:
    modelName = 'pretrainedCNN.h5'
    genres = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "metal"]
    genres.sort()
    

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
            spectrograms.append(librosa.feature.melspectrogram(signal, n_fft=1024, hop_length=256, n_mels=128)[:,:,np.newaxis])
            #add the genre matching the spectrogram to the array
    spectrograms = np.array(spectrograms)
    return spectrograms


#Function that loads the model and predict a song
def predictGenre():
    #Open a window to ask which music to guess
    # root = Tk()
    # root.attributes('-topmost', True) # note - before topmost
    # root.withdraw()
    # filename = askopenfilename()
    # root.destroy()
    
    filename = "python/Ladida.mp3"
    
    print("0")
    signal, sr = librosa.load(filename) #loading the file
    print("1")
    melspec = processSong(signal) #process the file into melspec of shape (128, 129, 1)
    print("2")
    CNN = tf.keras.models.load_model('python/models/' + modelName) #load the model
    print("3")
    prediction = CNN.predict_classes(melspec) #predict the classes
    print("4")
    # print("\nsong is composed of " + str(len(prediction)) + " segments")
    
    #retrieve genre and count for each genre
    unique, counts = np.unique(prediction, return_counts=True)
    labels = genres
    total = 0
    higherGuess = np.argmax(counts)
    print("5")
    
    #calculate percentage
    for c in counts:
        total = total + c
    
    print("6")

    for genre, count in zip(unique, counts):
        stat = (count/total) * 100
        print(labels[genre], " : ", "%.2f" % stat , "%")
    
    print("7")

    print("\nmost probable : ", labels[unique[higherGuess]])
    
    #plot histogram
    # timeAxis = []
    # for i in range(0, len(prediction)):
    #     timeAxis.append(i*1.5)

    # yAxis = []
    # for i in range(0, len(prediction)):
    #     genre = labels[prediction[i]]
    #     yAxis.append(labels[prediction[i]])

    # plt.plot(timeAxis, yAxis, ls = "None", marker=".", markersize = 5)
    # plt.show()



predictGenre()
# files = os.listdir(os.curdir)
# print(files)
# print(str(os.getcwd()) + "/music/Ladida.mp3")
["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "metal"]

