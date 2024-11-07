import carModel from "../model/cars.js";

// create car
export const createCar = async (req, res, next) => {
    try {
        const car = await carModel.create(req.body);
        res.status(200).json({response: "sucessfull", car: {
            carName: car.carName,
            carImg: car.carImg,
            passengers: car.passengers,
            suitcases: car.suitcases,
            rate: car.suitcases,
        }})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// get car
export const getCar = async (req, res, next) => {
    try {
        const {id} = req.params;
        const query = req.query;
        const distance = Number(query.distance)
        const car = await carModel.findById(id);
        if(!car) {
            res.status(404).json({message: "there is no such car available"});
            return;
        }

        const protocol = req.protocol;
        const host = req.get('host');
       
        res.status(200).json({
            response: "sucessfull",
            car: {
                carName: car.carName,
                passengers: car.passengers,
                suitcases: car.suitcases,
                rate: car.rate,
                totalRate: car.rate * distance,
                distance,
                carImgSrc: `${protocol}://${host}/assets/available-car/${car.carImg}`
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// get all car
export const getAllCar = async (req, res, next) => {
    try {
        const query = req.query;
        const distance = Number(query.distance)

        const protocol = req.protocol;
        const host = req.get('host');

        const cars = await carModel.aggregate([
            {
                $addFields: {
                    totalRate: {
                        $multiply: ["$rate", distance]
                    }, 
                    carImgSrc : {
                        $concat: [
                            protocol, 
                            "://", 
                            host, 
                            "/assets/available-car/", 
                            "$carImg" 
                        ]
                    },
                },
            },
            {
                $unset: ["__v"],
            },
        ])
        res.status(200).json({response: "sucessfull", cars})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// update car
export const updateCar = async (req, res, next) => {
    res.send("update car")
}
// delete car
export const deleteCar = async (req, res, next) => {
    res.send("delete car")
}


