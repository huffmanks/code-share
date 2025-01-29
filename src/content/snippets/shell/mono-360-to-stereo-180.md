---
title: Monoscopic 360° to stereoscopic 180° video
description: Convert monoscopic 360° to side-by-side left stereoscopic 180° video.
tags: ["ffmpeg", "vr"]
updatedAt: 2025-01-13 16:07:00
fragments:
  - filename: mono-360-to-stereo-180
    label: Command
    language: sh
    position: 0
    code: |
      # change input file: input_360.mov
      # Use HEVC (H.265) for better compression: -c:v libx265
      # Increase bitrate for better quality: -b:v 20M
      ffmpeg -i input_360.mov -vf "v360=input=equirect:output=fisheye:h_fov=180:v_fov=180" -c:v libx264 -crf 18 -preset slow output_180_sbs.mp4
---

ffmpeg -i input_360.mp4 -filter_complex "
[0:v]v360=input=equirect:output=fisheye:h_fov=180:v_fov=180:yaw=-45[left];
[0:v]v360=input=equirect:output=fisheye:h_fov=180:v_fov=180:yaw=45[right];
[left][right]hstack" -c:v libx264 -crf 18 -preset slow output_180_sbs.mp4

ffmpeg -i input_360.mp4 -filter_complex "
[0:v]v360=input=equirect:output=fisheye:h_fov=180:v_fov=180:yaw=-45[left];
[0:v]v360=input=equirect:output=fisheye:h_fov=180:v_fov=180:yaw=45[right];
[left][right]hstack" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p output_vr180.mp4

ffmpeg -i input_360.mp4 -filter_complex "
[0:v]v360=input=equirect:output=equirect:h_fov=180:v_fov=180:yaw=-5[left];
[0:v]v360=input=equirect:output=equirect:h_fov=180:v_fov=180:yaw=5[right];
[left][right]hstack" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p output_vr180.mp4
