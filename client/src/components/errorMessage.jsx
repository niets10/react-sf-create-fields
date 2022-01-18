import React from "react";
import "./components-css/errorMessage.css";

const ErrorMessage = (props) => {

    return(
        <>
            <div className="flex-container error-container p-2 mb-2 mx-2">
                <div >{props.errorMessage}</div>
                <div className="px-1">
                    <button type="button" class="btn-close" aria-label="Close" onClick={props.onHideError}></button>
                </div>
            </div>
        </>
    )

}

export default ErrorMessage;