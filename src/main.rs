use rand::Rng;
use std::error::Error;
use std::result::Result;
use std::time::Instant;
use std::thread;

#[derive(Clone, Copy, Debug)]
pub struct Point {
    x: f32,
    y: f32,
}

pub struct PointsSet {
    points: Vec<Point>,
}

impl Point {
    pub fn new(x: f32, y: f32) -> Point {
        Point { x, y }
    }

    pub fn distance_to(&self, other: &Point) -> f32 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        (dx * dx + dy * dy).sqrt()
    }
}

impl PointsSet {
    pub fn new(points: Vec<Point>) -> PointsSet {
        PointsSet { points }
    }
    pub fn find_closest_and_farthest(&self) -> Result<((Point, Point), (Point, Point)), Box<dyn Error>> {
        if self.points.len() < 2 {
            return Err(Box::new(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "At least two points are required",
            )));
        } else {
            let mut most_distant_points = (self.points[0], self.points[1]);
            let mut closest_points = (self.points[0], self.points[1]);
            let mut biggest_distance = most_distant_points.0.distance_to(&most_distant_points.1);
            let mut closest_distance = closest_points.0.distance_to(&closest_points.1);

            for i in 0..self.points.len() {
                for j in i + 1..self.points.len() {
                    let distance = self.points[i].distance_to(&self.points[j]);
                    if distance > biggest_distance {
                        most_distant_points = (self.points[i], self.points[j]);
                        biggest_distance = distance;
                    }
                    if distance < closest_distance {
                        closest_points = (self.points[i], self.points[j]);
                        closest_distance = distance;
                    }
                }
            }
            Ok((most_distant_points,closest_points))
        }
    }

    pub fn generate_random_points(total: f32) -> PointsSet {
        let mut i:f32 = 0.0;
        let mut rng = rand::thread_rng();
        let mut input: Vec<Point> = Vec::new();
        while i < total {
            let new_point = Point::new(
                rng.gen_range(1..=1000) as f32,
                rng.gen_range(1..=1000) as f32,
            );
            input.push(new_point);
            i = i + 1.0
        }
        let points_set = PointsSet::new(input);
        points_set
    }
}

fn main() {
    println!("Started generating random points");
    let start_time = Instant::now();
    let points = PointsSet::generate_random_points(100000.0);
    let duration = start_time.elapsed();
    println!("Took {:?} to generate points", duration);
    println!("Started to calculate");
    let start_time = Instant::now();
    let points = points.find_closest_and_farthest().unwrap();
    let duration = start_time.elapsed();
    println!("Took {:?} to calculate", duration);
    println!("Distant points: {:?}", points.0);
    println!("Closest points: {:?}", points.1);
}
