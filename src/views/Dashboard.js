/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================



* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

// core components
import { chart1_2_options } from "variables/charts.js";
import { getProfileViews, getFavCount } from "actions/dashbaordAction";
import { useAlert } from "react-alert";

function Dashboard(props) {
  const alert = useAlert();
  const dispatch = useDispatch();
  let dashboardData = useSelector((state) => state.dashboardData);
  const { profileData, favData } = dashboardData;
  const [profileChartData, setProfileChartData] = useState(null);
  const [favChartData, setFavChartData] = useState(null);
  const genRateChartData = (incoming, flag) => {
    return {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: incoming?.xAxis ?? [],
          datasets: [
            {
              label: flag ? "Favorite Count" : "Views",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: incoming?.yAxis?.[0]?.data ?? [],
            },
          ],
        };
      },
    };
  };
  const [bigChartData, setbigChartData] = React.useState("m");
  const [bigChartDataFav, setbigChartDataFav] = React.useState("m");

  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  // useEffect(() => {
  //   dispatch(getProfileViews({ dateFilter: bigChartData, userId: null }))
  //     .then((resp) => {})
  //     .catch((err) => {
  //       alert.error(err.message);
  //     });
  // }, [bigChartData]);
  // useEffect(() => {
  //   dispatch(getFavCount({ dateFilter: bigChartDataFav, userId: null }))
  //     .then((resp) => {})
  //     .catch((err) => {
  //       alert.error(err.message);
  //     });
  // }, [bigChartDataFav]);
  useEffect(() => {
    let chartData = genRateChartData(profileData);

    setProfileChartData(chartData);
  }, [profileData]);
  useEffect(() => {
    let chartData = genRateChartData(favData, 1);

    setFavChartData(chartData);
  }, [favData]);
  let filters = [
    {
      name: "Today",
      key: "t",
    },
    {
      name: "Weekly",
      key: "w",
    },
    {
      name: "Monthly",
      key: "m",
    },
    {
      name: "Yearly",
      key: "y",
    },
    {
      name: "Till Now",
      key: "a",
    },
  ];
  return (
    <>
      <div className="content">
        {profileChartData ? (
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Profile Views</h5>
                      {/* <CardTitle tag="h2">Performance</CardTitle> */}
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        {filters.map((e) => {
                          return (
                            <Button
                              key={e.key}
                              tag="label"
                              className={classNames("btn-simple", {
                                active: bigChartData === e.key,
                              })}
                              color="info"
                              id="0"
                              size="sm"
                              onClick={() => setBgChartData(e.key)}
                            >
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                {e.name}
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-single-02" />
                              </span>
                            </Button>
                          );
                        })}
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={profileChartData.data}
                      options={chart1_2_options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {favChartData ? (
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Favorite Count</h5>
                      {/* <CardTitle tag="h2">Performance</CardTitle> */}
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        {filters.map((e) => {
                          return (
                            <Button
                              key={e.key}
                              tag="label"
                              className={classNames("btn-simple", {
                                active: bigChartDataFav === e.key,
                              })}
                              color="info"
                              id="0"
                              size="sm"
                              onClick={() => setbigChartDataFav(e.key)}
                            >
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                {e.name}
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-single-02" />
                              </span>
                            </Button>
                          );
                        })}
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line data={favChartData.data} options={chart1_2_options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Dashboard;
