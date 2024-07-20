
import  React from "react"


export default function Dies(props){
  const styles = {
    backgroundColor:props.isHeld ? "lightgreen" : "white",
    color:props.isHeld ? "black" : "red"
  }

    return(
        <div className="die--face"
              style={styles}
              onClick={props.holdDice}
        >


          <h2 className="die--num">{props.value} </h2>
        </div>
    )
}