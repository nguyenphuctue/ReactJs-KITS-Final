import { useState, useEffect } from "react";
import { Button, Modal, Form, InputNumber, Typography } from "antd";
import { SettingOutlined, ReloadOutlined } from "@ant-design/icons";
const { Title } = Typography;

import "./pomodoro-clock.css";
import { baseUrl } from "../../App";

const WORKING_TIME = 10;
const RELAX_TIME = 5;
function PomodoroClock() {
  const [mode, setMode] = useState("Working");
  const [countTime, setCountTime] = useState(WORKING_TIME);
  const [workingTime, setWorkingTime] = useState(WORKING_TIME);
  const [relaxTime, setRelaxTime] = useState(RELAX_TIME);
  const [currentTime, setCurrentTime] = useState("");

  const [isPaused, setIsPaused] = useState(true);
  const [showSetting, setShowSetting] = useState(false);

  const [workingTimeSet, setWorkingTimeSet] = useState(0);
  const [relaxTimeSet, setRelaxTimeSet] = useState(0);

  const styleWorking = {
    backgroundImage: "url(" + baseUrl + "img/working.png" + ")",
    backgroundSize: "100% 100%",
  };
  const styleRelax = {
    backgroundImage: "url(" + baseUrl + "img/relax.jpg" + ")",
    backgroundSize: "100% 100%",
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, [currentTime]);

  useEffect(() => {
    if (isPaused == false) {
      const interval = setInterval(countdown, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, mode, countTime, workingTime, relaxTime]);

  function countdown() {
    if (countTime > 0) {
      setCountTime(countTime - 1);
    } else {
      if (mode === "Working") {
        setCountTime(relaxTime);
        setMode("Relax");
      } else {
        setCountTime(workingTime);
        setMode("Working");
      }
    }
  }

  function convertTime(seconds) {
    let hour = Math.floor(seconds / 3600);
    let minute = Math.floor((seconds % 3600) / 60);
    let second = (seconds % 3600) % 60;

    return (
      ("0" + hour).slice(-2) +
      ":" +
      ("0" + minute).slice(-2) +
      ":" +
      ("0" + second).slice(-2)
    );
  }

  function startOrPause() {
    isPaused ? setIsPaused(false) : setIsPaused(true);
  }

  function reset() {
    setWorkingTime(WORKING_TIME);
    setRelaxTime(RELAX_TIME);
    setCountTime(WORKING_TIME);
    setMode("Working");
  }

  function getWorkingTime(value) {
    setWorkingTimeSet(value);
  }

  function getRelaxTime(value) {
    setRelaxTimeSet(value);
  }

  function changeModeSetting() {
    showSetting ? setShowSetting(false) : setShowSetting(true);
  }

  function handleOkSetting() {
    setWorkingTime(workingTimeSet * 60);
    setRelaxTime(relaxTimeSet * 60);
    setShowSetting(false);
  }

  function handleCancelSetting() {
    setShowSetting(false);
  }

  return (
    <div
      className="pomodoro"
      style={mode == "Working" ? styleWorking : styleRelax}
    >
      <div className="clock">
        <Title style={{ textAlign: "center", color: "antiquewhite" }}>
          {mode}
        </Title>
        <div className="clock-content">
          <div className="count-time">{convertTime(countTime)}</div>
        </div>
        <div className="current-time">Current time: {currentTime}</div>
        <div className="working-time">
          Working Time: {convertTime(workingTime)}
        </div>
        <div className="relax-time">Relax Time: {convertTime(relaxTime)}</div>
        <div className="control">
          <Button onClick={startOrPause}>{isPaused ? "Start" : "Pause"}</Button>
          <Button onClick={reset}>
            <ReloadOutlined />
          </Button>
          <Button onClick={changeModeSetting}>
            <SettingOutlined />
          </Button>
          <Modal
            title="Setting"
            open={showSetting}
            onOk={handleOkSetting}
            onCancel={handleCancelSetting}
          >
            <Form labelCol={{ span: 10 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Working time (minutes)">
                <InputNumber
                  min={0}
                  value={workingTimeSet}
                  style={{ width: 200 }}
                  onChange={getWorkingTime}
                />
              </Form.Item>
              <Form.Item label="Relax time (minutes)">
                <InputNumber
                  min={0}
                  value={relaxTimeSet}
                  style={{ width: 200 }}
                  onChange={getRelaxTime}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PomodoroClock;
