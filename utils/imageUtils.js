// utils/imageUtils.js

// Image mappings for each topic
const imageMap = {
  // Tiger images
  tiger: {
    // Infographics (capitalized, with _info)
    Tiger_info1: require('@/assets/images/tiger/Tiger_info1.jpeg'),
    
    // Normal shots (lowercase, no _info)
    tiger1: require('@/assets/images/tiger/tiger1.jpeg'),
    tiger2: require('@/assets/images/tiger/tiger2.jpeg'),
    tiger3: require('@/assets/images/tiger/tiger3.jpeg'),
    tiger4: require('@/assets/images/tiger/tiger4.jpeg'),
    tiger5: require('@/assets/images/tiger/tiger5.jpeg'),
    tiger6: require('@/assets/images/tiger/tiger6.jpeg'),
    tiger7: require('@/assets/images/tiger/tiger7.jpeg'),
    tiger8: require('@/assets/images/tiger/tiger8.jpeg'),
    tiger9: require('@/assets/images/tiger/tiger9.jpeg'),
    tiger10: require('@/assets/images/tiger/tiger10.jpeg'),
    tiger11: require('@/assets/images/tiger/tiger11.jpeg'),
    tiger12: require('@/assets/images/tiger/tiger12.jpeg'),
  },
  
  // Tapir images
  tapir: {
    // Infographics
    Tapir_info1: require('@/assets/images/tapir/Tapir_info1.png'),
    
    // Normal shots
    tapir1: require('@/assets/images/tapir/tapir1.jpeg'),
    tapir2: require('@/assets/images/tapir/tapir2.jpeg'),
    tapir3: require('@/assets/images/tapir/tapir3.jpeg'),
    tapir4: require('@/assets/images/tapir/tapir4.jpeg'),
    tapir5: require('@/assets/images/tapir/tapir5.jpeg'),
    tapir6: require('@/assets/images/tapir/tapir6.jpeg'),
    tapir7: require('@/assets/images/tapir/tapir7.jpeg'),
    tapir8: require('@/assets/images/tapir/tapir8.jpeg'),
  },
  
  // Turtle images
  turtle: {
    // Infographics
    Turtle_info1: require('@/assets/images/turtle/Turtle_info1.png'),
    Turtle_info2: require('@/assets/images/turtle/Turtle_info2.png'),
    Turtle_info3: require('@/assets/images/turtle/Turtle_info3.jpeg'),
    Turtle_info4: require('@/assets/images/turtle/Turtle_info4.jpeg'),
    Turtle_info5: require('@/assets/images/turtle/Turtle_info5.jpeg'),
    
    // Normal shots
    turtle1: require('@/assets/images/turtle/turtle1.jpeg'),
    turtle2: require('@/assets/images/turtle/turtle2.jpeg'),
    turtle3: require('@/assets/images/turtle/turtle3.jpeg'),
    turtle4: require('@/assets/images/turtle/turtle4.jpeg'),
    turtle5: require('@/assets/images/turtle/turtle5.jpeg'),
    turtle6: require('@/assets/images/turtle/turtle6.jpeg'),
    turtle7: require('@/assets/images/turtle/turtle7.jpeg'),
    turtle8: require('@/assets/images/turtle/turtle8.jpeg'),
    turtle9: require('@/assets/images/turtle/turtle9.jpeg'),
    turtle20: require('@/assets/images/turtle/turtle10.jpeg'),
  },
};

export function getImagesForTopic(topic) {
  const topicImages = imageMap[topic.toLowerCase()] || {};
  const infographics = [];
  const shots = [];

  Object.keys(topicImages).forEach((imageName, index) => {
    const imageData = {
      id: `${topic}-${imageName}`,
      name: imageName,
      source: topicImages[imageName],
    };

    // Check if it's an infographic (starts with capital and contains _info)
    if (imageName.match(/^[A-Z].*_info\d+$/)) {
      infographics.push(imageData);
    } else if (imageName.match(/^[a-z].*\d+$/)) {
      // Normal shot (starts with lowercase, no _info)
      shots.push(imageData);
    }
  });

  return { infographics, shots };
}

// Helper function to add new images dynamically
export function addImageToMap(topic, imageName, imageSource) {
  if (!imageMap[topic]) {
    imageMap[topic] = {};
  }
  imageMap[topic][imageName] = imageSource;
}