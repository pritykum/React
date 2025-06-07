import React, { useState } from "react";
import "./KairosGroups.scss";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const KairosGroups: React.FC = () => {
    const [currentTechView, setCurrentTechView] = useState<string>("both");

    const [nrDataExpand, setNRDataExpand] = useState<boolean>(false);

    const [lteDataExpand, setLTEDataExpand] = useState<boolean>(false);

    const [nrColSpan, setNRColSpan] = useState<number>(16);

    const [lteColSpan, setLTEColSpan] = useState<number>(11);

    const [nrData, setNRData] = useState([
        {id: 1, name: "OEM NR CAP UL Traffic volume", value: 10, hasExpanded: false},
        {id: 2, name: "AFR NSA", value: 11, hasExpanded: false},
        {id: 3, name: "NR NSA DCR", value: 12, hasExpanded: false},
        {id: 4, name: "NR DL Avg. MAC Thput", value: 13, hasExpanded: false},
        {id: 5, name: "OEM NR CAP DL Traffic Vol MAC (GB)", value: 14, hasExpanded: false},
        {id: 6, name: "NR UL MAC Cell Thput (NR_5091b)", value: 15, hasExpanded: false},
        {id: 7, name: "NR CBRA Setup Att (NR_5012a)", value: 17, hasExpanded: false},
        {id: 8, name: "NR NSA RL Failures (NR_5036g)", value: 18, hasExpanded: false},
        {id: 9, name: "OEM NR RET (NR_5025c)", value: 19, hasExpanded: false},
        {id: 10, name: "NSA Inter gNB HOSR (NR_5034a)", value: 20, hasExpanded: false},
        {id: 11, name: "SA Accessibility SR (NR_5151d)", value: 21, hasExpanded: false},
        {id: 12, name: "SA Inter-gNBHO ExecSR (NR_5183b)", value: 22, hasExpanded: false},
        {id: 13, name: "NSA Active RACH SSR (NR_5022e)", value: 23, hasExpanded: false},
        {id: 14, name: "Avg MAC Usr ThPut DL (NR_5100c)", value: 24, hasExpanded: false},
        {id: 15, name: "Avg MAC Usr ThPut UL (NR_5101b)", value: 25, hasExpanded: false},
        {id: 16, name: "MAC DV UL DTCH NSA+SA (NR_5083a)", value: 26, hasExpanded: false},
    ]);

    const [lteData, setLTEData] = useState([
        {id: 1, name: "VoLTE AFR", value: 10, hasExpanded: false},
        {id: 2, name: "VoLTE DCR", value: 11, hasExpanded: false},
        {id: 3, name: "Average UE DL Throughput (kbit/s)", value: 12, hasExpanded: false},
        {id: 4, name: "LTE DL Traffic Volume (GB)", value: 13, hasExpanded: false},
        {id: 5, name: "LTE Voice Traffic (Erl)", value: 14, hasExpanded: false},
        {id: 6, name: "VOLTE ACCESS FAIL RATE", value: 15, hasExpanded: false},
        {id: 7, name: "VOLTE DROP RATEL16", value: 17, hasExpanded: false},
        {id: 8, name: "ERAB ACCESS FAIL RATE", value: 18, hasExpanded: false},
        {id: 9, name: "ERAB DROP RATE ACTIVE USERS GCRL16", value: 19, hasExpanded: false},
        {id: 10, name: "UL TRAFFIC VOLUME GB", value: 20, hasExpanded: false},
        {id: 11, name: "VoLTE Access Fails", value: 21, hasExpanded: false},
    ]);

    const handleAllExpansion = (action: string, tech: string) : void => {
        if (tech === "lte") {
            if (action === "expand") {
                setLTEDataExpand(true);
                setLTEColSpan(44);

                let newData = lteData;

                newData.forEach((data) => {
                    data.hasExpanded = true
                });

                setLTEData(newData)
            }
            else {
                setLTEDataExpand(false);
                setLTEColSpan(11);

                let newData = lteData;

                newData.forEach((data) => {
                    data.hasExpanded = false
                });

                setLTEData(newData)
            }
        }
        else {
            if (action === "expand") {
                setNRDataExpand(true);
                setNRColSpan(64);

                let newData = nrData;

                newData.forEach((data) => {
                    data.hasExpanded = true
                });

                setNRData(newData)
            }
            else {
                setNRDataExpand(false);
                setNRColSpan(16);

                let newData = nrData;

                newData.forEach((data) => {
                    data.hasExpanded = false
                });

                setNRData(newData)
            }
        }
    }

    const handleSingleExpansion = (index: number, action: string, tech: string) : void => {
        if (tech === "lte") {
            if (action === "expand") {
                let newData = lteData;
                newData[index].hasExpanded = true;
                setLTEData(newData);
                setLTEColSpan(lteColSpan+3);
            }
            else {
                let newData = lteData;
                newData[index].hasExpanded = false;
                setLTEData(newData);
                setLTEColSpan(lteColSpan-3);
            }
        }
        else {
            if (action === "expand") {
                let newData = nrData;
                newData[index].hasExpanded = true;
                setNRData(newData);
                setNRColSpan(nrColSpan+3);
            }
            else {
                let newData = nrData;
                newData[index].hasExpanded = false;
                setNRData(newData);
                setNRColSpan(nrColSpan-3);
            }
        }
    }

  return (
    <div className="p-1 w-full" style={{overflowX: "auto"}}>
        <table>
            <thead id="digital-dashboard-table">
                <tr>
                    <th colSpan={16}></th>
                    {
                        (currentTechView === "nr" || currentTechView === "both") &&
                        <th colSpan={nrColSpan} className="header-one">
                            <div className="flex align-items-center justify-content-center m-1">
                                <span className="ml-1 mr-1">NR KPI</span>
                                {
                                    nrDataExpand ? 
                                    <>
                                        <FontAwesomeIcon icon={faMinusCircle} className="header-expand-control-icon" onClick={() => {handleAllExpansion("collapse", "nr")}} />
                                    </> :
                                    <>
                                        <FontAwesomeIcon icon={faPlusCircle} className="header-expand-control-icon" onClick={() => {handleAllExpansion("expand", "nr")}} />
                                    </>
                                }
                            </div>
                        </th>
                    }
                    {
                        (currentTechView === "lte" || currentTechView === "both") &&
                        <th colSpan={lteColSpan} className="header-one">
                            <div className="flex align-items-center justify-content-center m-1">
                                <span className="ml-1 mr-1">LTE KPI</span>
                                {
                                    lteDataExpand ?
                                    <>
                                        <FontAwesomeIcon icon={faMinusCircle} className="header-expand-control-icon" onClick={() => {handleAllExpansion("collapse", "lte")}} />
                                    </> :
                                    <>
                                        <FontAwesomeIcon icon={faPlusCircle} className="header-expand-control-icon" onClick={() => {handleAllExpansion("expand", "lte")}} />
                                    </>
                                }
                            </div>
                        </th>
                    }
                </tr>

                <tr>
                    <th colSpan={3}>
                        <div className="flex flex-column">
                            <div className="flex align-items-center justify-content-center">
                                <Button className={currentTechView === "lte" ? "header-tech-btn-selected" : "header-tech-btn-unselected"} onClick={() => {setCurrentTechView("lte")}}>LTE</Button>
                                <Button className={currentTechView === "nr" ? "header-tech-btn-selected" : "header-tech-btn-unselected"} onClick={() => {setCurrentTechView("nr")}}>NR</Button>
                                <Button className={currentTechView === "both" ? "header-tech-btn-selected" : "header-tech-btn-unselected"} onClick={() => {setCurrentTechView("both")}}>Both</Button>
                            </div>
                            <div className="mt-2">
                                <FontAwesomeIcon icon={faInfoCircle} className="response-info-icon"/>
                            </div>
                        </div>
                    </th>
                    <th colSpan={12} className="header-two">
                        Automated Health Checks
                    </th>
                    <th className="header-two">
                        ML Use Case
                    </th>
                    {
                        (currentTechView === "nr" || currentTechView === "both") &&
                        <>
                            {
                                nrData.map((data, index) => (
                                    <th key={index} className={data.hasExpanded ? "header-two" : "header-two vertical-header"} colSpan={data.hasExpanded ? 4 : 1}>
                                        {data.name} &nbsp;
                                        {
                                            data.hasExpanded ?
                                            <>
                                                <FontAwesomeIcon icon={faMinusCircle} className="header-expand-control-icon" onClick={() => {handleSingleExpansion(index, "collapse", "nr")}} />
                                            </> :
                                            <>
                                                <FontAwesomeIcon icon={faPlusCircle} className="header-expand-control-icon" onClick={() => {handleSingleExpansion(index, "expand", "nr")}} />
                                            </>
                                        }
                                    </th>
                                ))
                            }
                        </>
                    }

                    {
                        (currentTechView === "lte" || currentTechView === "both") &&
                        <>
                            {
                                lteData.map((data, index) => (
                                    <th key={index} className={data.hasExpanded ? "header-two" : "header-two vertical-header"} colSpan={data.hasExpanded ? 4 : 1}>
                                        {data.name} &nbsp;
                                        {
                                            data.hasExpanded ?
                                            <>
                                                <FontAwesomeIcon icon={faMinusCircle} className="header-expand-control-icon" onClick={() => {handleSingleExpansion(index, "collapse", "lte")}} />
                                            </> :
                                            <>
                                                <FontAwesomeIcon icon={faPlusCircle} className="header-expand-control-icon" onClick={() => {handleSingleExpansion(index, "expand", "lte")}} />
                                            </>
                                        }
                                    </th>
                                ))
                            }
                        </>
                    }
                </tr>

                <tr>
                    <th className="header-three vertical-header">Site</th>
                    <th className="header-three vertical-header">Cells</th>
                    <th className="header-three vertical-header">Report</th>
                    <th className="header-three vertical-header">Map View</th>
                    <th className="header-three vertical-header">Cell Status</th>
                    <th className="header-three vertical-header">Alarm</th>
                    <th className="header-three vertical-header">Sleepy Cell</th>
                    <th className="header-three vertical-header">RTWP / RSSI</th>
                    <th className="header-three vertical-header">PCI / RSI</th>
                    <th className="header-three vertical-header">RET</th>
                    <th className="header-three vertical-header">Rules Based</th>
                    <th className="header-three vertical-header">Param Audit</th>
                    <th className="header-three vertical-header">Param History</th>
                    <th className="header-three vertical-header">Sector Swap</th>
                    <th className="header-three vertical-header">SW / HW Changes</th>
                    <th className="header-three vertical-header">Deep Analytics</th>
                    {
                        (currentTechView === "nr" || currentTechView === "both") &&
                        <>
                            {
                                nrData.map((data, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            data.hasExpanded ?
                                            <>
                                                <th className="header-three vertical-header">Pre</th>
                                                <th className="header-three vertical-header">Post</th>
                                                <th className="header-three vertical-header">Last Daily</th>
                                                <th className="header-three vertical-header">Delta</th>
                                            </> :
                                            <>
                                                <th className="header-three vertical-header">Post</th>
                                            </>
                                        }
                                    </ React.Fragment>
                                ))
                            }
                        </>
                    }
                    {
                        (currentTechView === "lte" || currentTechView === "both") &&
                        <>
                            {
                                lteData.map((data, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            data.hasExpanded ?
                                            <>
                                                <th className="header-three vertical-header">Pre</th>
                                                <th className="header-three vertical-header">Post</th>
                                                <th className="header-three vertical-header">Last Daily</th>
                                                <th className="header-three vertical-header">Delta</th>
                                            </> :
                                            <>
                                                <th className="header-three vertical-header">Post</th>
                                            </>
                                        }
                                    </ React.Fragment>
                                ))
                            }
                        </>
                    }
                </tr>
            </thead>
        </table>
    </div>
  )
}

export default KairosGroups;