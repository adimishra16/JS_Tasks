import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const CalculatorBody = styled.div`
    width: 300px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Display = styled.input`
    width: 100%;
    height: 50px;
    font-size: 24px;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    background: #eee;
    border-radius: 5px;
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ color }) => color || "#e0e0e0"};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ color }) => (color ? "#d1d1d1" : "#d6d6d6")};
    }
`;

const Result = styled.h3`
    text-align: right;
    font-size: 20px;
    margin-top: 10px;
    color: #333;
`;

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const calculateResult = () => {
        try {
            setResult(eval(input));
        } catch {
            setResult("Error");
        }
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    return (
        <Container>
            <CalculatorBody>
                <Display type="text" value={input} readOnly />
                <ButtonGrid>
                    <Button color="#ff6666" onClick={clearInput}>C</Button>
                    <Button onClick={() => handleClick("/")}>/</Button>
                    <Button onClick={() => handleClick("*")}>*</Button>
                    <Button onClick={() => handleClick("-")}>-</Button>

                    {[7, 8, 9].map((num) => (
                        <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                    ))}
                    <Button onClick={() => handleClick("+")}>+</Button>

                    {[4, 5, 6].map((num) => (
                        <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                    ))}

                    {[1, 2, 3].map((num) => (
                        <Button key={num} onClick={() => handleClick(num)}>{num}</Button>
                    ))}
                    <Button color="#ff9900" onClick={calculateResult}>=</Button>

                    <Button onClick={() => handleClick(0)}>0</Button>
                    <Button onClick={() => handleClick(".")}>.</Button>
                </ButtonGrid>

                <Result>Result: {result}</Result>
            </CalculatorBody>
        </Container>
    );
};

export default Calculator;
