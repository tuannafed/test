/* eslint-disable react/display-name */
import { Chip, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Done } from '@mui/icons-material';
import { listingService } from 'common/api';
import { ITag } from '../types';

interface TagListProps {
  subcategory: string;
  initSelectedTags?: string[];
  onTagChange?: (tags: string[]) => void;
}

export const CreateTagList = React.memo<TagListProps>(
  ({ subcategory, initSelectedTags, onTagChange }) => {
    const [selectedTags, setSelectedTags] = useState<Array<string>>(
      initSelectedTags || []
    );
    const [tags, setTags] = useState<Array<ITag>>([]);

    useEffect(() => {
      listingService
        .getTagsByCategory(subcategory, {})
        .then(({ data }) => {
          const listTags = data.data;
          setTags(listTags);
        })
        .catch(err => {
          console.log(err);
        });
    }, [subcategory]);

    const onClickTag = (tag: ITag) => {
      toggleTags(tag);
    };

    const toggleTags = (tag: ITag) => {
      const copyTags = [...selectedTags];
      if (copyTags.includes(tag._id)) {
        const index = copyTags.indexOf(tag._id);

        copyTags.splice(index, 1);

        setSelectedTags(copyTags);

        onTagChange && onTagChange(copyTags);
      } else {
        copyTags.push(tag._id);

        setSelectedTags(copyTags);

        onTagChange && onTagChange(copyTags);
      }
    };

    return (
      <Stack
        direction="row"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="flex-start"
        key="tag-list"
        sx={{ maxHeight: 120, overflowY: 'auto' }}
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
            onDelete={() => onClickTag(tag)}
            deleteIcon={<Done />}
            onClick={() => onClickTag(tag)}
            key={`tag_${index}`}
            label={tag.tag_name}
            color="secondary"
            size="medium"
            variant={selectedTags.includes(tag._id) ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>
    );
  }
);
