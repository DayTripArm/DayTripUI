import React from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack, MuiTick } from "./components";
import BarChart from "./BarChart";

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);

      this.price_range = [];
      const min_max = this.props.min_max;
      const step = this.props.isTrip ? 10: 1000;

      for (let i = min_max[0]; i <= min_max[1]; i=i+step) {
          this.price_range.push(i);
      }
      const sortedData = this.price_range.slice().sort((a, b) => a - b);
      const range = [sortedData[0], sortedData[sortedData.length - 1]];

      this.state = {
        domain: range,
        update: this.props.range,
        values: this.props.range,
        inputValues: this.props.range
      };
      this.onChange = (price_range) => {
          if (this.props.onChange) {
              this.props.onChange(price_range);
          }
      };
      this.maxPriceChange = (evt, inputValues) => {
          const value = evt.target.value;
          const newState = [inputValues[0], value];
          this.setState({ inputValues: newState });
          this.onChange(newState);
          if (value && value <= this.state.domain[1] && value >= this.state.values[0]) {
              this.setState({ values: newState });
          }
      }
      this.minPriceChange = (evt, inputValues) => {
          const value = evt.target.value;
          const newState = [value, inputValues[1]];
          this.setState({ inputValues: newState });
          this.onChange(newState);
          if (value && value >= this.state.domain[0]) {
              this.setState({ values: newState });
          }
      }
  }

  render() {
    const { domain, values, update, inputValues } = this.state;
    const {min_price_text, max_price_text} = this.props.price_label;
    const step = this.props.isTrip ? 10: 1000;

    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={{ margin: "4%", height: 100, width: "90%" }}>
            <BarChart
              data={this.price_range}
              prices_list={this.props.prices_list}
              highlight={update}
              domain={domain}
              step={step}
            />
            <Slider
              mode={3}
              step={step}
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
                  label={min_price_text}
                  type="number"
                  value={inputValues[0]}
                  onChange={(evt) => {
                      this.minPriceChange(evt, inputValues)
                  }}
                  onKeyUp={(evt) => {
                      this.minPriceChange(evt, inputValues)
                  }}
                  onKeyDown={(evt) => {
                      this.minPriceChange(evt, inputValues)
                  }}
                  InputProps={{
                      inputProps: {
                          max: update[1], min: domain[0], step: step
                      },
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: "center" }}></Grid>
              <Grid item xs={4} style={{ textAlign: "left" }}>
                <TextField
                  variant="outlined"
                  label={max_price_text}
                  type="number"
                  value={inputValues[1]}
                  onChange={(evt) => {
                      this.maxPriceChange(evt, inputValues)
                  }}
                  onKeyUp={(evt) => {
                      this.maxPriceChange(evt, inputValues)
                  }}
                  onKeyDown={(evt) => {
                      this.maxPriceChange(evt, inputValues)
                  }}
                  InputProps={{
                      inputProps: {
                          max: domain[1], min: update[0], step: step
                      },
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
