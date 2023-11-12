import { CardContent, CardHeader } from "@mui/material";
import { BarChart } from "../components/graphs/BarChart";

export const BarChartLayout = ({chartOptions}) => {
    return (
        <>
            <CardHeader title="Niveau d&#39;occupation des autobus"></CardHeader>
            <CardContent className="w-full h-full">
                <BarChart chartOptions={chartOptions}/>
            </CardContent>
        </>
    );
}