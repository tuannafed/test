import React from 'react';
import { Stack, Chip } from '@mui/material';
import { ITag } from '../types';
import { TagList } from './TagList';

interface TagListProps {
  tags: Array<ITag>;
}
export const DetailTags: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Stack
      direction="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
      sx={{ overflowX: 'scroll' }}
    >
      {tags.map((tag, index) => (
        <Chip
          sx={{
            mx: 1,
            mb: 1,
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          key={`tag_${tag._id}`}
          label={tag.tag_name}
          color="secondary"
          size="medium"
          variant="filled"
        ></Chip>
      ))}
    </Stack>
  );
};

DetailTags.defaultProps = {
  tags: []
};
