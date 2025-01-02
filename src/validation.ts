//   const validate = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!reviewData.trainerRate) {
//       newErrors.trainerRate = "Trainer rate is required.";
//     }
//     if (!reviewData.diffcultTrainer) {
//       newErrors.diffcultTrainer = "Difficulty rating is required.";
//     }
//     if (!reviewData.takeClass) {
//       newErrors.takeClass = "Please indicate if you'd take another class.";
//     }
//     if (!reviewData.freeClass) {
//       newErrors.freeClass = "Please indicate if this was a free class.";
//     }
//     if (!reviewData.musicChoice) {
//       newErrors.musicChoice = "Music choice rating is required.";
//     }
//     if (!reviewData.tags || reviewData.tags.length === 0) {
//       newErrors.tags = "Please select up to 3 tags.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };