import logo from './logo.svg';
import './App.css';
import data from './Legends'
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [monitorType, setMonitorType] = useState([]);
  const [Legends, setLegends] = useState([]);
  const [Monitors, setMonitors] = useState([]);
  const [monitorsByMonitorType, setMonitorsByMonitorType] = useState([]);
  const [LegendId, setLegenId] = useState(0);
  const [LegendByMonitorType, setLegendByMonitorType] = useState([]);

  useEffect(async () => {
    setMonitorType(data.MonitorType);
    setLegends(data.Legends)
    setMonitors(data.Monitor)
  }, [])

  const getMonitorsByMonitorType = (id, LegentId) => {
    let MonitorsByMonitorType = Monitors.filter(x => x.MonitorTypeId == id)
    setMonitorsByMonitorType([...MonitorsByMonitorType])
    setLegendByMonitorType([])
    setLegenId(LegentId)
  }
  
  const getLegendsByMonitorType = () => {
    let Legend = Legends.find(x => x.Id == LegendId);
    let LegendTags = Legend.tags;
    setLegendByMonitorType([...LegendTags])
  }

  return (
    <div className="App">

      <Container id="buttonsMonitorType">
        {
          monitorType.map(x => {
            return <Button id="buttonMonitorType" variant="primary" onClick={() => getMonitorsByMonitorType(x.Id, x.LegentId)}>{x.Name}</Button>
          })

        }
      </Container>
      <Container id="buttonsMonitor">
        {
          monitorsByMonitorType.length != 0 && monitorsByMonitorType.map(x => {
            return <Button id="buttonMonitor" variant="primary" onClick={() => { getLegendsByMonitorType() }}>{x.Name}</Button>
          })

        }
      </Container>
      {
        LegendByMonitorType.length != 0 && <Container id="Legends">
          {
            LegendByMonitorType.map(x => {
              return <Container id="LegendTag">
                <Row>
                  <Col id="colorLegend" style={{ backgroundColor: x.Color }}></Col>
                  <Col id="labelLegend">{x.Label}</Col>
                </Row>
              </Container>
            })
          }
        </Container>
      }
    </div>
  );
}

export default App;
