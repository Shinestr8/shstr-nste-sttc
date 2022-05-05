import {useState } from "react";

export function ImprovementModalBody(props){

    const [isGoodGuess, setIsGoodGuess] = useState(null);
    const [realGenre, setRealGenre] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [genreProposition, setGenreProposition] = useState("");

    const genres = ["Blues", "Classical", "Country", "Disco", "Hiphop", "Jazz", "Metal", "Pop", "Reggae", "Rock"];


    function onValueChange(e){
        // console.log(e.target.value);
        setRealGenre(null);
        setGenreProposition(null);
        if(e.target.value === "Yes"){
            setIsGoodGuess(true);
            setDisabled(false);
        } else {
            setIsGoodGuess(false);
            setDisabled(true);
        }
    }

    async function sendData(data){
        
        const response = await fetch('/yes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const content = await response.json();
        console.log(content);
    }


    function handleSubmit(e){
        e.preventDefault();
        let result = {
            "guessed": props.guess,
            "true": props.guess
        }
        
        if(!isGoodGuess && realGenre && realGenre !== "Other"){
            result = {
                    "guessed": props.guess,
                    "true": realGenre.toLowerCase()
                }
        }
        if(!isGoodGuess && realGenre && realGenre === "Other"){
            result = {
                "guessed": props.guess,
                "true": genreProposition.toLowerCase()
            }
        }
        sendData(result);
        props.toggleShow();
        props.showAlert();
    }

    function onGenreValueChange(e){
        // console.log(e.target.value);
        setRealGenre(e.target.value);
        setGenreProposition("");
        if(e.target.value !== "Other"){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    function handlePropositionChange(e){
        setGenreProposition(e.target.value);
        if(e.target.value !== ""){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    

    return(
        <form>
            
            <section onChange={onValueChange}>
                <p>Is {props.guess} a good guess ?</p>
                <input type="radio" id="Yes" name="guess-quality" value="Yes"/>
                <label htmlFor="Yes">Yes</label>

                <input type="radio" name="guess-quality" value="No" id="No"/>
                <label htmlFor="No">No</label>
            </section>
            {isGoodGuess === false && (
                <section onChange={onGenreValueChange}>
                    <p>What is the real genre ?</p>
                    {genres.map(function(genre, index){
                        return (
                        <div key={`real-genre-${genre}`}>
                            <input type="radio" name="real-genre" value={genre} id={genre}/>
                            <label htmlFor={genre}>{genre}</label>
                        </div>
                        )
                    })}
                    <div>
                            <br/>
                            <input type="radio" name="real-genre" value="Other" id="other"/>
                            <label htmlFor="other">Other</label>
                    </div>
                </section>
            )}
            {isGoodGuess === false && realGenre === "Other" && (
                <section>
                    <p>What is your proposition ?</p>
                    <input type="text" name="proposition" value={genreProposition} onChange={handlePropositionChange}/>
                    
                </section>
                
            )}
            <footer>
                <button id="modal-submit-btn" disabled={disabled} onClick={handleSubmit}>Submit</button>
            </footer>
            
        </form>
    )
}