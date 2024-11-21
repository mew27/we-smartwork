import { Paper, PaperProps, Stack, Typography } from "@mui/material";

interface InfoBoxProps extends PaperProps {
    title : string,
    children?: string | null,
}

const InfoBox = ({title, children, ...props} : InfoBoxProps) => {
    return (<>
        <Paper {...props} elevation={0}>
            <Stack sx={{padding: "0.7em"}} spacing={4}>
                <Typography sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">
                    {title}
                </Typography>
                <Typography>
                    {children}
                </Typography>
            </Stack>
        </Paper>
    </>);
}

export default InfoBox;