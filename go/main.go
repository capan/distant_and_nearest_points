package main

import (
	"fmt"
	"math"
	"math/rand"
	"os"
	"time"
)

type Point struct {
	X int
	Y int
}

func NewPoint(x, y int) *Point {
	return &Point{X: x, Y: y}
}

func (p *Point) DistanceTo(other *Point) float64 {
	dx := p.X - other.X
	dy := p.Y - other.Y
	return math.Sqrt(float64(dx*dx + dy*dy))
}

func findClosestAndFarthest(points []Point) [4]Point {
	if len(points) < 2 {
		panic("At least two points are needed for calculation")
	}
	var closestPoints [2]*Point = [2]*Point{&points[0], &points[1]}
	var farthestPoints [2]*Point = [2]*Point{&points[0], &points[1]}
	var closestDistance = closestPoints[0].DistanceTo(closestPoints[1])
	var farthestDistance = farthestPoints[0].DistanceTo(farthestPoints[1])
	for i := 0; i < len(points)-1; i++ {
		for j := i + 1; j < len(points)-1; j++ {
			var distance = points[i].DistanceTo(&points[j])
			if distance < closestDistance {
				closestPoints = [2]*Point{&points[i], &points[j]}
				closestDistance = distance
			}
			if distance > farthestDistance {
				farthestPoints = [2]*Point{&points[i], &points[j]}
				farthestDistance = distance
			}
		}
	}
	return [4]Point{*farthestPoints[0], *farthestPoints[1], *closestPoints[0], *closestPoints[1]}
}

func inputGen(totalNumber int) []Point {
	rand.Seed(time.Now().UnixNano())
	var output []Point
	for i := 0; i < totalNumber; i++ {
		output = append(output, Point{rand.Intn(1000) + 1, rand.Intn(1000) + 1})
	}
	return output
}

func main() {
	fmt.Print("Enter an integer: ")
	var i int
	_, err := fmt.Scan(&i)
	if err != nil {
		fmt.Println(err)
		return
	}
	start := time.Now()
	var randomPairs = inputGen(i)
	durationInputGen := time.Since(start)
	fmt.Printf("Time taken to generate %d random points: %v\n", i, durationInputGen)

	start = time.Now()
	var res = findClosestAndFarthest(randomPairs)
	durationFindClosestAndFarthest := time.Since(start)
	fmt.Printf("Time taken to find closest and farthest points: %v\n", durationFindClosestAndFarthest)

	println(res[0].X, res[0].Y, res[1].X, res[1].Y, res[2].X, res[2].Y, res[3].X, res[3].Y)
	os.Exit(0)
}
