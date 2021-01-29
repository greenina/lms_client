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
            <SideNav id="sideb"
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
                    <NavItem eventKey="createClass">
                        <NavIcon>
                        <img id="createicon" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQyNi42NjY2N3B0IiB2aWV3Qm94PSIwIDAgNDI2LjY2NjY3IDQyNi42NjY2NyIgd2lkdGg9IjQyNi42NjY2N3B0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00MDUuMzMyMDMxIDE5MmgtMTcwLjY2NDA2MnYtMTcwLjY2Nzk2OWMwLTExLjc3MzQzNy05LjU1ODU5NC0yMS4zMzIwMzEtMjEuMzM1OTM4LTIxLjMzMjAzMS0xMS43NzM0MzcgMC0yMS4zMzIwMzEgOS41NTg1OTQtMjEuMzMyMDMxIDIxLjMzMjAzMXYxNzAuNjY3OTY5aC0xNzAuNjY3OTY5Yy0xMS43NzM0MzcgMC0yMS4zMzIwMzEgOS41NTg1OTQtMjEuMzMyMDMxIDIxLjMzMjAzMSAwIDExLjc3NzM0NCA5LjU1ODU5NCAyMS4zMzU5MzggMjEuMzMyMDMxIDIxLjMzNTkzOGgxNzAuNjY3OTY5djE3MC42NjQwNjJjMCAxMS43NzczNDQgOS41NTg1OTQgMjEuMzM1OTM4IDIxLjMzMjAzMSAyMS4zMzU5MzggMTEuNzc3MzQ0IDAgMjEuMzM1OTM4LTkuNTU4NTk0IDIxLjMzNTkzOC0yMS4zMzU5Mzh2LTE3MC42NjQwNjJoMTcwLjY2NDA2MmMxMS43NzczNDQgMCAyMS4zMzU5MzgtOS41NTg1OTQgMjEuMzM1OTM4LTIxLjMzNTkzOCAwLTExLjc3MzQzNy05LjU1ODU5NC0yMS4zMzIwMzEtMjEuMzM1OTM4LTIxLjMzMjAzMXptMCAwIi8+PC9zdmc+" />
                        </NavIcon>
                        <NavText>
                            Create Class
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="joinClass">
                        <NavIcon>
                        <img id="joinicon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgyLjggNDgyLjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4Mi44IDQ4Mi44OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTI1NS4yLDIwOS4zYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyMS45LDIxLjksMjEuOSw1Ny41LDAsNzkuNGwtMTE1LDExNWMtMjEuOSwyMS45LTU3LjUsMjEuOS03OS40LDBsLTE3LjMtMTcuMw0KCQkJYy0yMS45LTIxLjktMjEuOS01Ny41LDAtNzkuNGwxMTUtMTE1YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTExNSwxMTVDOC43LDMyMi43LDAsMzQzLjYsMCwzNjUuOA0KCQkJYzAsMjIuMiw4LjYsNDMuMSwyNC40LDU4LjhsMTcuMywxNy4zYzE2LjIsMTYuMiwzNy41LDI0LjMsNTguOCwyNC4zczQyLjYtOC4xLDU4LjgtMjQuM2wxMTUtMTE1YzMyLjQtMzIuNCwzMi40LTg1LjIsMC0xMTcuNg0KCQkJQzI2OS4xLDIwNCwyNjAuNSwyMDQsMjU1LjIsMjA5LjN6Ii8+DQoJCTxwYXRoIGQ9Ik00NTguNSw1OC4ybC0xNy4zLTE3LjNjLTMyLjQtMzIuNC04NS4yLTMyLjQtMTE3LjYsMGwtMTE1LDExNWMtMzIuNCwzMi40LTMyLjQsODUuMiwwLDExNy42YzUuMyw1LjMsMTMuOCw1LjMsMTkuMSwwDQoJCQlzNS4zLTEzLjgsMC0xOS4xYy0yMS45LTIxLjktMjEuOS01Ny41LDAtNzkuNGwxMTUtMTE1YzIxLjktMjEuOSw1Ny41LTIxLjksNzkuNCwwbDE3LjMsMTcuM2MyMS45LDIxLjksMjEuOSw1Ny41LDAsNzkuNGwtMTE1LDExNQ0KCQkJYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsMTE1LTExNWMxNS43LTE1LjcsMjQuNC0zNi42LDI0LjQtNTguOA0KCQkJQzQ4Mi44LDk0LjgsNDc0LjIsNzMuOSw0NTguNSw1OC4yeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
                        </NavIcon>
                        <NavText>
                            Join Class
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
    )
}

export default ClassList;