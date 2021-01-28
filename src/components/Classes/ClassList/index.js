import React, { Component, useEffect, useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './style.css'
const ClassList = ({classesInfo, changeClassPage}) => {

    const loadClassInfo = () => {
        return (
            classesInfo.map((classInfo) => {
                return (
                    <NavItem eventKey={classInfo.classId}>
                        <NavText>
                            {classInfo.className}
                        </NavText>
                    </NavItem>
                )
            })
        )
    }

    return (
            <SideNav
                onSelect={(selected) => {
                    console.log(selected)
                    changeClassPage(selected);
                }}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected={classesInfo.classId}>
                    <NavItem eventKey="ClassPage">
                        <NavIcon>
                        <img id="classicon" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTQ5MS4yIDI5Ni4yOTVjMC0xMy4wOTMgMC0yNjguMTQ1IDAtMjgxLjI4NiAwLTguMjg0LTYuNzE2LTE1LTE1LTE1aC00NDAuNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXYyODEuMjg2Yy0xMS43OTEgMi4wMDMtMjAuOCAxMi4yODYtMjAuOCAyNC42NHY0NS4zNTZjMCAxMy43ODUgMTEuMjE1IDI1IDI1IDI1aDU1LjY5MmwtMzQuMzczIDEwMC44NmMtMy4zMjUgOS43NjEgMy45NjcgMTkuODQgMTQuMiAxOS44NGg2NC45NmM2LjQyIDAgMTIuMTItNC4wOSAxNC4yLTEwLjE2bDM3LjY3My0xMTAuNTM5aDE1Ny4yOTVsMzcuNjczIDExMC41MzljMi4wOCA2LjA3IDcuNzggMTAuMTYgMTQuMiAxMC4xNmg2NC45NmMxMC4yMzEgMCAxNy41MjYtMTAuMDc2IDE0LjItMTkuODRsLTM0LjM3My0xMDAuODU5aDU1LjY5MmMxMy43ODUgMCAyNS0xMS4yMTUgMjUtMjV2LTQ1LjM1NmMuMDAxLTEyLjM1NC05LjAwOC0yMi42MzctMjAuNzk5LTI0LjY0MXptLTQ0MC40LTI2Ni4yODZoNDEwLjR2MTk1LjVoLTEyMy4yYy0xMy43ODUgMC0yNSAxMS4yMTUtMjUgMjV2NDUuNDI2aC0yNjIuMnptNDEwLjQgMjI1LjV2NDAuNDI2aC0xMTguMnYtNDAuNDI2em0tMzQ2LjQ2MSAyMjYuNDgyaC0zMy4yNmwzMC45MTMtOTAuNjk5aDMzLjI2em0yODIuNTIyIDAtMzAuOTEzLTkwLjY5OWgzMy4yNmwzMC45MTMgOTAuNjk5em04NC43MzktMTIwLjdjLTEyLjYwOSAwLTQzOS4zNTkgMC00NTIgMHYtMzUuMzU2aDQ1MnoiLz48cGF0aCBkPSJtMTA5Ljk1IDExMS4yOTVoMjkyLjFjOC4yODQgMCAxNS02LjcxNiAxNS0xNXMtNi43MTYtMTUtMTUtMTVoLTI5Mi4xYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0yODguOTUgMTY0LjAwOWgtMTc5Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDE3OWM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNXoiLz48L2c+PC9zdmc+" />
                        </NavIcon>
                        <NavText>
                            Classes
                        </NavText>
                        {loadClassInfo()}
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
    )
}

export default ClassList;