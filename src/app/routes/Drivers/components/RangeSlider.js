import React from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack, MuiTick } from "./components";
import BarChart from "./BarChart";

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);

      this.price_range = [];
      for (let i = 10; i <= 1000; i++) {
          this.price_range.push(Math.floor(Math.random() * 1100) + 10);
      }
      const sortedData = this.price_range.slice().sort((a, b) => a - b);
      const range = [sortedData[0], sortedData[sortedData.length - 1]];

    this.state = {
      domain: range,
      update: this.props.range || [10, 1100],
      values: this.props.range || [10, 1100],
      inputValues: range
    };
      this.onChange = (price_range) => {
          if (this.props.onChange) {
              this.props.onChange(price_range);
          }
      };
  }

  render() {
    const { domain, values, update, inputValues } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={{ margin: "4%", height: 120, width: "90%" }}>
            <BarChart
              data={this.price_range}
              prices_list={this.props.prices_list}
              highlight={update}
              domain={domain}
            />
            <Slider
              mode={3}
              step={10}
              domain={domain}
              rootStyle={{
                position: "relative",
                width: "100%"
              }}
              onUpdate={(update) => {
                this.setState({ update, inputValues: update});
                this.onChange(update)
              }}
              onChange={(values) => {this.setState({ values }); this.onChange(update);}}
              values={values}
            >
              <Rail>
                {({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}
              </Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map((handle) => (
                      <MuiHandle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <MuiTrack
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={5}>
                {({ ticks }) => (
                  <div className="slider-ticks">
                    {ticks.map((tick) => (
                      <MuiTick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
            <Grid
              container
              alignItems="center"
              justify="space-around"
              style={{ marginTop: "60px" }}
            >
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <TextField
                  variant="outlined"
                  label="min price"
                  value={inputValues[0]}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    const newState = [value, inputValues[1]];
                    this.setState({ inputValues: newState });
                    this.onChange(newState);
                    if (value && value >= domain[0]) {
                      this.setState({ values: newState });
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}>
                —
              </Grid>
              <Grid item xs={4} style={{ textAlign: "left" }}>
                <TextField
                  variant="outlined"
                  label="max price"
                  value={inputValues[1]}
                  onChange={(evt) => {
                    const value = evt.target.value;
                    const newState = [inputValues[0], value];
                    this.setState({ inputValues: newState });
                    this.onChange(newState);
                    if (value && value <= domain[1] && value >= values[0]) {
                      this.setState({ values: newState });
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default RangeSlider;
