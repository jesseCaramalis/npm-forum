import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

type TagBarProps = {
  tags: { name: string }[];
  onTagSelect?: (tags: string[]) => void;
  selectedTags?: string[];
};

// this component renders a horizontal scrollable list of tags
// it accepts an array of tags and a function to handle tag selection, as well as an array of selected tags (by default empty)
// when rendered on the PostComponent, it receives the tags from that post.
// on the FeedScreen, it receives all tags using the fetchFilterBarTags function
// when selected, tags are passed to the onTagSelect function, which is used to filter the posts in the FeedScreen

const TagBar: React.FC<TagBarProps> = ({ tags, onTagSelect, selectedTags = []}) => {
  
  // this function handles tag selection
  // if the tag is already selected, it is removed from the array of selected tags
  // if the tag is not selected, it is added to the array of selected tags
  const handleTagSelect = (tag: string) => {
    if (onTagSelect) {
      const isSelected = selectedTags?.includes(tag);
      const newSelectedTags = isSelected
        ? selectedTags?.filter((t) => t !== tag) || []
        : [...(selectedTags || []), tag];
      onTagSelect(newSelectedTags);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags?.includes(tag.name) ? styles.selectedTag : null
            ]}
            onPress={() => handleTagSelect(tag.name)}
          >
            <Text style={[
              styles.tagText,
              selectedTags?.includes(tag.name) ? styles.selectedTagText : null
            ]}>
              {tag.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  tag: {
    backgroundColor: 'hsla(0, 0%, 22%, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: '#6537FF',
  },
  tagText: {
    color: '#555',
    fontFamily: 'Syne-Regular',
  },
  selectedTagText: {
    color: '#fff',
  },
});

export default TagBar;