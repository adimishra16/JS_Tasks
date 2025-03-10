import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { evaluate } from "mathjs";


const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #2c3e50, #4ca1af);
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

const CalculatorBody = styled.div`
    width: 300px;
    padding: 20px;
    background: #222;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
`;

const Display = styled.div`
    width: 270px;
    height: 60px;
    font-size: 32px;
    text-align: right;
    padding: 15px;
    margin-bottom: 10px;
    border: none;
    background: #333;
    color: white;
    border-radius: 5px;
    overflow: hidden;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const Button = styled.button`
    width: 100%;
    height: 60px;
    font-size: 22px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ color }) => color || "#444"};
    color: white;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ color }) => (color ? "#e67e22" : "#666")};
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const safeEvaluate = (expression) => {
        try {
            return evaluate(expression).toString();
        } catch {
            return "Error";
        }
    };

    const handleClick = (value) => {
        if (result) {
            setInput(value.toString());
            setResult("");
        } else {
            setInput((prev) => prev + value.toString());
        }
    };

    const calculateResult = () => {
        if (input.trim() === "") return;
        const calculatedResult = safeEvaluate(input);
        setResult(calculatedResult);
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    const deleteLast = () => {
        setInput((prev) => prev.slice(0, -1)); 
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <CalculatorBody>
                    <Display>{result || input || "0"}</Display>
                    <ButtonGrid>
                        <Button color="#ff6666" onClick={clearInput}>C</Button>
                        <Button onClick={deleteLast}>⌫</Button>
                        <Button onClick={() => handleClick("/")}>/</Button>
                        <Button onClick={() => handleClick("*")}>*</Button>

                        {[7, 8, 9].map((num) => (
                            <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                        ))}
                        <Button onClick={() => handleClick("-")}>-</Button>

                        {[4, 5, 6].map((num) => (
                            <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                        ))}
                        <Button onClick={() => handleClick("+")}>+</Button>

                        {[1, 2, 3].map((num) => (
                            <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                        ))}
                        <Button color="#ff9900" onClick={calculateResult}>=</Button>

                        <Button onClick={() => handleClick(0)}>0</Button>
                        <Button onClick={() => handleClick(".")}>.</Button>
                    </ButtonGrid>
                </CalculatorBody>
            </Container>
        </>
    );
};

export default Calculator;
