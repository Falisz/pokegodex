import React, { useState, useEffect } from 'react';
import './styles/types.css';

function Types() {
    const [dataMap, setDataMap] = useState(new Map());

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/types');
                if (response.ok) {
                    const jsonData = await response.json();
                    // Convert the types object to a Map of Maps
                    const typesMap = new Map(
                        Object.entries(jsonData.types).map(([type, effectiveness]) => [
                            type,
                            new Map(Object.entries(effectiveness))
                        ])
                    );
                    setDataMap(typesMap);
                } else {
                    console.error('Failed to fetch types data');
                    setDataMap(new Map());
                }
            } catch (error) {
                console.error('Error fetching JSON:', error);
                setDataMap(new Map());
            }
        }

        fetchData();
    }, []);

    return (
        <div className={'types-chart'}>
            {dataMap.size > 0 &&
                <>
                    <div className={'types-chart-header'}>
                        <div className={'types-chart-header-item'} key={'empty'}></div>
                        {Array.from(dataMap.entries()).map(([type]) => (
                            <div key={type} className={`types-chart-header-item bg-${type.charAt(0).toUpperCase() + type.slice(1)}`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </div>
                        ))}
                    </div>
                    {Array.from(dataMap.entries()).map(([type, effectivenessMap]) => (
                        <div key={type} className={'types-chart-row'}>
                            <li className={`types-chart-row-item bg-${type.charAt(0).toUpperCase() + type.slice(1)}`} key={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </li>
                            {Array.from(effectivenessMap.entries()).map(([targetType, multiplier]) => (
                                <li className={'types-chart-row-item'} key={targetType?.toString()}>
                                    {multiplier}x
                                </li>
                            ))}
                        </div>
                    ))}
                </>
            }
        </div>
    );
}

export default Types;