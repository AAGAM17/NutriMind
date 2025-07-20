import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PostProps = {
  post: {
    id: string;
    user: {
      name: string;
      avatar: any;
    };
    time: string;
    image: any;
    caption: string;
    likes: number;
    comments: number;
    mealType: string;
  };
  style?: object;
};

export default function PostCard({ post, style }: PostProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Header with user info */}
      <View style={styles.header}>
        <Image source={post.user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.user.name}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post image */}
      <Image source={post.image} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={24} />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} />
        </TouchableOpacity>
      </View>

      {/* Likes and caption */}
      <View style={styles.details}>
        <Text style={styles.likes}>{post.likes} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.usernameInline}>{post.user.name}</Text> {post.caption}
        </Text>
        <Text style={styles.mealType}>{post.mealType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
  },
  usernameInline: {
    fontWeight: '600',
    marginRight: 6,
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  spacer: {
    flex: 1,
  },
  details: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 8,
  },
  caption: {
    marginBottom: 8,
  },
  mealType: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '600',
  },
});