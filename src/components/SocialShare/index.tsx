import { Stack, Button } from '@mui/material';
import React, { useState } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

interface SocialShareProps {
  link: string;
  media: any;
  urlCopy?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  link,
  media,
  urlCopy
}) => {
  const [copySuccess, setCopySuccess] = useState('Copy link bài đăng');

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Đã copy');
      setTimeout(() => {
        setCopySuccess('Copy link bài đăng');
      }, 2000);
    } catch (err) {
      setCopySuccess('Copy không thành công');
    }
  };

  return (
    <Stack alignItems="center" mt={2}>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        <FacebookShareButton url={link}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <PinterestShareButton media={media} url={link}>
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <TwitterShareButton url={link}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={link}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        {urlCopy && (
          <Button
            variant="contained"
            size="small"
            onClick={() => copyToClipBoard(urlCopy)}
            sx={{
              height: 31,
              borderRadius: '50px',
              width: { xs: '200px', sm: 'auto' }
            }}
          >
            {copySuccess}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
