import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Auctions() {
    const nav = useNavigate();

    const navigate = () => {
        nav('/home');
    }

    return (
        <>
            <h1>auctions</h1>
        </>
    );
}