export const dummyPosts = [
  {
    id: '1',
    user: {
      name: 'Chef Ernesto Gray',
      avatar: require('../../assets/images/icon.png'),
      isVerified: true,
    },
    image: require('../../assets/images/icon.png'),
    description: 'My healthy quinoa bowl with avocado and veggies!',
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 55,
      fat: 12,
    },
    likes: 45,
    comments: 12,
    timeAgo: '2h ago',
    tags: ['#healthy', '#quinoa', '#avocado'],
    isLiked: false,
    isSaved: false,
  },
  // Add more posts as needed...
];