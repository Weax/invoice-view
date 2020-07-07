import { useState } from "react";

export default <O extends Object>(data: O[]) => {
    const [editedData, setEditedData] = useState(data);

    //find record by index, then change by property key
    const updateRecord = (index: number, key: string) => (v: any) => {
        /*        
        setEditedData(prevState => {
            const newData = [...prevState];
            const obj = { ...newData[index], [key]: v }
            newData[index] = obj;
            return newData;
        });
        */
        setEditedData(prevState =>
            Object.assign(
                [...prevState],
                { [index]: Object.assign({}, prevState[index], { [key]: v }) }
            )
        );
    };

    return [editedData, updateRecord] as const;
};
