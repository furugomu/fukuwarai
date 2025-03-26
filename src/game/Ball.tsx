"use client";

import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";

type BallProps = {
  /** 位置 */
  position: { x: number; y: number };
  /** ボールの大きさ */
  size: { width: number; height: number };
  /** ボールの画像のURL */
  image: string;
};

type MovingBallProps = {
  /** 初期位置 */
  position: { x: number; y: number };
  /** 初期速度 */
  velocity: { x: number; y: number };
  /** ボールの大きさ */
  size: { width: number; height: number };
  /** フィールドの大きさ */
  fieldSize: { width: number; height: number };
  /** ボールの画像のURL */
  image: string;
  /** 摩擦係数 (フレーム毎) */
  friction: number;
  /** 停止判定の閾値 */
  stopThreshold: number;
  /** ボールが停止した時のコールバック */
  onStop: (position: { x: number; y: number }) => void;
};

/** 球 */
export function Ball({ position, size, image }: BallProps) {
  const [imageObj] = useImage(image);

  return (
    <Group x={position.x} y={position.y}>
      <KonvaImage image={imageObj} width={size.width} height={size.height} />
    </Group>
  );
}

/** 動いている球 */
export function MovingBall({
  position: initialPosition,
  velocity: initialVelocity,
  size,
  fieldSize,
  image,
  friction,
  stopThreshold,
  onStop,
}: MovingBallProps) {
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState(initialVelocity);
  const [isMoving, setIsMoving] = useState(true);
  const animationRef = useRef<number>(undefined);
  const [imageObj] = useImage(image);

  // Calculate velocity magnitude
  const getVelocityMagnitude = (vel: { x: number; y: number }) => {
    return Math.sqrt(vel.x * vel.x + vel.y * vel.y);
  };
  // よくわからないが2回呼んじゃうので阻止
  const onStopCalled = useRef(false);

  useEffect(() => {
    if (!isMoving) return;

    const updatePosition = () => {
      setPosition((prevPosition) => {
        // Calculate new position
        const newX = prevPosition.x + velocity.x;
        const newY = prevPosition.y + velocity.y;

        // Check for collisions with walls
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // Right and left walls
        if (newX + size.width > fieldSize.width) {
          newVelocityX = -Math.abs(velocity.x);
        } else if (newX < 0) {
          newVelocityX = Math.abs(velocity.x);
        }

        // Bottom and top walls
        if (newY + size.height > fieldSize.height) {
          newVelocityY = -Math.abs(velocity.y);
        } else if (newY < 0) {
          newVelocityY = Math.abs(velocity.y);
        }

        // Apply friction
        newVelocityX *= friction;
        newVelocityY *= friction;

        // Update velocity
        setVelocity({ x: newVelocityX, y: newVelocityY });

        // Check if ball should stop
        if (
          getVelocityMagnitude({ x: newVelocityX, y: newVelocityY }) <
          stopThreshold
        ) {
          setIsMoving(false);
          // Ensure the ball is within bounds when stopping
          const finalX = Math.max(
            0,
            Math.min(newX, fieldSize.width - size.width)
          );
          const finalY = Math.max(
            0,
            Math.min(newY, fieldSize.height - size.height)
          );

          if (!onStopCalled.current) {
            // Call the onStop callback with the final position
            onStop({ x: finalX, y: finalY });
            onStopCalled.current = true;
          }

          return { x: finalX, y: finalY };
        }

        // Ensure the ball stays within bounds
        return {
          x: Math.max(0, Math.min(newX, fieldSize.width - size.width)),
          y: Math.max(0, Math.min(newY, fieldSize.height - size.height)),
        };
      });

      // Continue animation if still moving
      if (isMoving) {
        animationRef.current = requestAnimationFrame(updatePosition);
      }
    };

    animationRef.current = requestAnimationFrame(updatePosition);

    // Cleanup animation frame on unmount or when ball stops
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, isMoving, size, fieldSize, friction, stopThreshold, onStop]);

  return (
    <Group x={position.x} y={position.y}>
      <KonvaImage image={imageObj} width={size.width} height={size.height} />
    </Group>
  );
}
