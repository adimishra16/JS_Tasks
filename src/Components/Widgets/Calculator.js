import { useState } from "react";

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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Simple Calculator</h2>
            <div>
                <input type="text" value={input} readOnly />
                <div>
                    <button onClick={clearInput}>C</button>
                    <button onClick={() => handleClick("/")}>/</button>
                    <button onClick={() => handleClick("*")}>*</button>
                    <button onClick={() => handleClick("-")}>-</button>
                </div>
                <div>
                    {[1, 2, 3].map((num) => (
                        <button key={num} onClick={() => handleClick(num)}>{num}</button>
                    ))}
                    <button onClick={() => handleClick("+")}>+</button>
                </div>
                <div>
                    {[4, 5, 6].map((num) => (
                        <button key={num} onClick={() => handleClick(num)}>{num}</button>
                    ))}
                </div>
                <div>
                    {[7, 8, 9].map((num) => (
                        <button key={num} onClick={() => handleClick(num)}>{num}</button>
                    ))}
                </div>
                <div>
                    <button onClick={() => handleClick(0)}>0</button>
                    <button onClick={() => handleClick(".")}>.</button>
                    <button onClick={calculateResult}>=</button>
                </div>
            </div>
            <h3>Result: {result}</h3>
        </div>
    );
};

export default Calculator;