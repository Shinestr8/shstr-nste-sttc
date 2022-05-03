export function About(){
    return(
        <div className="about-text">
            <div>
                <h1>About ONOBOT</h1>
                <p>
                    <h3>Why was ONOBOT created ?</h3>
                    <p>ONOBOT was created as part of a school project conducted in Master of Engineering in Information and Network Securty (INS) in the University of Limerick, Ireland</p>
                    <p>This project was realized throughout the entire year, from september 2019 to september 2020, it recieved a QCA score of 3.87/4</p>
                </p>
            
                <p>
                    <h3>The approach</h3>
                    <p>
                        In order to classify a music, ONOBOT converts audio files into mel-spectrograms (a visual representation of audio) and applies image recognition
                        on it using a Convolutional Neural Network, which is a model structure specialized in image recognition. A melspectrogram (example below) contains 
                        information on the Frequency (Y-axis), the Time (X-axis) and Amplitude (Color scale). This allows us to have a lot of informations with only one image.
                        <img 
                            className="melspectrogram-figure"
                            src={`${process.env.PUBLIC_URL}/images/report/melspectrogram.png`} 
                            alt="melspectrogram"
                            title="a melspectrogram"
                        />
                        <p>
                            To be more accurate, ONOBOT splits the audio files into chunks of 1.5 seconds, convert them into melspectrograms and predict the genre of each chunk separately.
                            This allows us to see the evolution of the genre through the music, and gives more precision on the final result.
                        </p>
                        <p>
                            The technologies used by ONOBOT are
                            <ul>
                                <li>Python</li>
                                <li>Tensorflow with Keras, to create the deep-learning neural network</li>
                                <li>Librosa for audio processing</li>
                                <li>GTZAN dataset</li>
                            </ul>
                        </p>
                        
                    </p>
                </p>

                <p>
                    <h3>GTZAN Dataset</h3>
                    <p>The most important part of most AI projects is the dataset. In the case of ONOBOT, the dataset is the <a href="https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification">GTZAN dataset</a>
                    , which is the most used for the task of music genre recognition. It is composed of a thousand 30 seconds tracks, distributed evenly between 10 music genres:
                    <ul>
                        <li>Blues</li>
                        <li>Classical</li>
                        <li>Country</li>
                        <li>Disco</li>
                        <li>Hip-hop</li>
                        <li>Jazz</li>
                        <li>Metal</li>
                        <li>Pop</li>
                        <li>Reggae</li>
                        <li>Metal</li>
                    </ul>
                    70% of the dataset was kept for training data and 30% for validation data. Which makes 14000 1.5seconds songs for training and 6000 1.5seconds songs for validation.
                    </p>
                </p>
                
            </div>
        </div>
    )
}