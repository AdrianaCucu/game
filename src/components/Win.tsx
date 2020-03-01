import React from "react";
import styled from "styled-components";

const StyledWin = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    position: fixed;
    z-index: 20;
    background: white;
    opacity: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 1s;
    transition-timing-function: ease-in;
`;

const Win = ({ duration }: { duration: number }) => {

    function playAgain() {
        window.location.reload(false);
    }

    function getDuration() {
        return duration;
    }

    return (
        <StyledWin>
            <div style={{ background: "#222f3e", opacity: "2 !important", width: "50%", height: "50%" }}>
                <p>You destroyed the world in {getDuration}</p>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </StyledWin>
    );
};

export default Win;