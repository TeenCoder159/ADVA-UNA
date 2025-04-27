use axum::{Router, extract, routing::post};
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new().route("/", post(input_manager));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Serialize, Deserialize)]
struct Input {
    location_lattitude: f64,
    location_longtitude: f64,
    temp: f64,
    season: String,
    elevation: isize,
    wind_speed: usize,
    wind_direction: isize,
    last_rain_date: (i32, i32, i32),
    dist_to_waterbody: i32,
}

impl Input {
    fn parse_to_csv(&self) -> String {
        format!(
            "{},{},{},{},{},{},{},{:04}-{:02}-{:02},{}",
            self.location_lattitude,
            self.location_longtitude,
            self.temp,
            self.season,
            self.elevation,
            self.wind_speed,
            self.wind_direction,
            self.last_rain_date.0,
            self.last_rain_date.1,
            self.last_rain_date.2,
            self.dist_to_waterbody
        )
    }
}

async fn input_manager(extract::Json(payload): extract::Json<Input>) {
    let contents = match std::fs::read_to_string("data.csv") {
        Ok(a) => a,
        Err(e) => {
            eprintln!("AN ERROR OCCURED:\n{e}");
            std::process::exit(-1)
        }
    };
    match std::fs::write(
        "data.csv",
        format!("{}\n{}", contents, payload.parse_to_csv()),
    ) {
        Ok(_) => {}
        Err(e) => {
            eprintln!("{e}")
        }
    }
}
