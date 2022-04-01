////////////////////
//// Build
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import data1 from '../mockData/data.json'
import dataset from '../mockData/data_dendrogram_full.json'

import CollapsibleTree from "../components/feature/CollapsibleTree";

////////////////////
//// Environmental

////////////////////
//// External

const dimensions = {
    width: 1000,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
};

function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}

export default function Practice() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(dataset);
        console.log(data)
    }, []);

    const updateData1 = () => {
        var _data = deepCopy(data);

        _data["children"][0]["children"][0]["value"] = 50;
        _data["children"][0]["children"][1]["value"] = 10;
        _data["children"][0]["children"][2]["value"] = 30;

        _data["children"][1]["children"][0]["value"] = 4;
        _data["children"][1]["children"][1]["value"] = 8;

        setData(_data);
    }

    const updateData2 = () => {
        var _data = deepCopy(data);

        _data["children"][0]["children"].push({
            "name":"mister_p",
            "group":"C",
            "value":20,
            "colname":"level3"
        })

        _data["children"][2]["children"].splice(2,1);

        setData(_data);
    }

    const updateData3 = () => {
        var _data = deepCopy(data);

        _data["children"].push({
            "name": "boss4",
            "children": [{
                "name":"mister_z",
                "group":"E",
                "value":40,
                "colname":"level3"
            }]
        });

        setData(_data);
        console.log(data)

    }

    const updateData4 = () => {
        var _data = deepCopy(data);

        _data["children"].splice(1,1);

        setData(_data);
        console.log(data)
    }

    const resetData = () => {
        setData(dataset);
        console.log(data)

    }

    if(data === null) return <></>;

    return (
        <>
            <View>
                <div className="btns">
                    <button onClick={updateData1}>Change Child Data Values</button>
                    <button onClick={updateData2}>Add/Remove Child Nodes</button>
                    <button onClick={updateData3}>Add Parent Nodes</button>
                    <button onClick={updateData4}>Remove Parent Nodes</button>
                    <button onClick={resetData}>Reset</button>
                </div>
                <CollapsibleTree data={data} dimensions={dimensions}/>
            </View>
        </>
    )
}

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

/** Created by ownwindows on 28-03-22 **/
