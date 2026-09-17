# Optional inline images for blog posts

## What will change
- Add an **Add image** control beside the blog markdown editor so an author can upload an image while writing.
- Insert the uploaded image into the article at the cursor using standard markdown, with editable alt text.
- Keep inline images completely optional; existing and future posts without them continue to publish normally.
- Reuse the existing protected image upload flow and public image delivery path, with separate organization for article images.
- Style article images as responsive, full-width editorial figures with consistent spacing, rounded corners, subtle borders, and optional captions.
- Preserve the existing cover/banner image as the primary article image and recommend inline images only for sections where a visual genuinely helps.

## Authoring syntax
```text
![Descriptive alt text](uploaded-image-url)

*Optional caption shown beneath the image.*
```

The editor will create the image markdown automatically after upload. The caption remains optional.

## Verification
- Confirm image upload inserts markdown at the current writing position.
- Confirm preview and published articles render inline images correctly.
- Check an article with no inline images still works unchanged.
- Check the layout on phone, tablet, and desktop widths.
