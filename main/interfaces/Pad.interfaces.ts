export interface IPad<M extends "code" | "open" | "play" = "code">
{
    row: number;
    column: number;
    method: M;
    action: {
        code: M extends "code" ? string : undefined;
        open: M extends "open" ? string : undefined;
        play: M extends "play" ? string : undefined;
    };
    color: "green" | "amber" | "red" | "yellow" | "off";
}