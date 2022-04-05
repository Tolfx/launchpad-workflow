import { io } from "../../server";

let isInformationMode = false;

export default ({
    row,
    column,
}:
{
    row: string;
    column: string;
}) =>
{
    switch(`${row}-${column}`)
    {
        case "8-7":
            io.emit("information_mode", !isInformationMode);
            break;
    }
}