## Project Description

This project aims to create a demonstration of how TensorFlow may be implemented in a research setting for students and researchers alike. This project scraped apartment pricing data from Zhongyuan, subsequently analyzed the data, and developed a Deep Neural Network Regression model to predict the price of the apartments. This project was conducted in Fall of 2017 as part of the Technology Enhanced Education Fellowship.

## Sample visualization with D3.js

You can view a [sample visualization](https://noelkonagai.github.io/shanghai-apartment/) with D3.js that aimed to demonstrate the capacity of D3.js in an academic setting.

## Data Description
X:
- id: the ID of the listing in the original database
- listing: the original wording of the listing
- district: the district of Shanghai in which the apartment is found
- area: the sub-district of Shanghai in which the apartment is found
- address: the address of the apartment
- xiaoqu: the neighbourhood (i.e. subsub-district) of Shanghai in whcih the apartment is found
- sqm: the area of the apartment in square meters
- room: number of bedrooms in the apartment
- lvgroom: number of livingrooms in the apartment
- year: the year in which the building was built
- renovation: the category of renovation (sheer, old, medium renovation, good renovation, luxury renovation)
- floor: categorical variable for the height at which the apartment is located (low, medium, high)
- direction: the cardinal direction in which the windows and the entrance are located
- lat: latitude
- lng: longitude
- station_1: the first closest metro station to the apartment
- station_2: the second closest metro station to the apartment
- dist_1: the distance to station_1
- dist_2: the distance to station_2
--------------------------------------
Y:
- price: the monthly rental price of the apartment in RMB
