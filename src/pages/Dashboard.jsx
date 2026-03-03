import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Auctions() {
    const nav = useNavigate();

    const navigate = () => {
        nav('/auctions');
    }

    return (
        <>
            <h1>dashboard</h1>
        </>
    );
}