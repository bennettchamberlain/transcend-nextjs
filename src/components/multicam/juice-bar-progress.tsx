import { useEffect, useRef, useState } from "react";

import type { WorkflowStep } from "@site/types/multicam";

interface JuiceBarProgressProps {
  currentStep: WorkflowStep;
  steps: { step: WorkflowStep; completed: boolean }[];
}

const stepLabels: Record<WorkflowStep, string> = {
  intake: "Intake",
  consultation: "Consultation",
  shoot: "Shoot",
  post: "Post Editing",
  delivery: "Delivery/Review",
};

const stepOrder: WorkflowStep[] = ["intake", "consultation", "shoot", "post", "delivery"];

// Liquid particle for physics simulation
class LiquidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseY: number; // Base Y position for floating effect
  baseX: number; // Base X position for oscillation
  connections: LiquidParticle[] = [];
  targetX: number; // Target X for smooth horizontal movement
  targetY: number; // Target Y for smooth vertical movement
  surfaceTension: number; // Surface tension coefficient
  viscosity: number; // Viscosity coefficient
  oscillationPhase: number; // Phase offset for unique oscillation pattern

  constructor(x: number, y: number, _width: number, _height: number) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.baseX = x; // Store original X position for oscillation
    this.targetX = x;
    this.targetY = y;
    this.oscillationPhase = Math.random() * Math.PI * 2; // Random phase for unique movement
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = 2 + Math.random() * 2.5;
    this.surfaceTension = 0.5 + Math.random() * 0.5;
    this.viscosity = 0.3 + Math.random() * 0.4;
    const hue = 60 + Math.random() * 15; // Lime green range
    this.color = `hsl(${hue}, 100%, ${50 + Math.random() * 8}%)`;
  }

  update(
    width: number,
    height: number,
    progress: number,
    allParticles: LiquidParticle[],
    scrollVelocity: { x: number; y: number },
    scrollAcceleration: { x: number; y: number },
    time: number,
    lastScrollActivity: number,
  ) {
    // Find nearby particles for surface tension and cohesion
    // Reduced distances to allow more freedom of movement
    const connectionDistance = 15;
    const cohesionDistance = 20;
    this.connections = allParticles.filter(
      (p) => p !== this && Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2) < connectionDistance,
    );

    // Random horizontal oscillation (liquid sloshing) - oscillates around baseX
    const oscillationAmplitude = 3 + Math.random() * 2; // Random amplitude between 3-5px
    const oscillationSpeed = 0.3 + Math.random() * 0.2; // Random speed for variation
    // Use sine wave to oscillate left and right around base position
    const oscillationOffset = Math.sin(time * oscillationSpeed + this.oscillationPhase) * oscillationAmplitude;
    this.targetX = this.baseX + oscillationOffset;

    // Smooth interpolation towards target X (viscosity effect)
    const xDiff = this.targetX - this.x;
    this.vx += xDiff * 0.02 * this.viscosity;

    // Damping for smooth liquid flow
    this.vx *= 0.96;

    // Soft cohesion - particles loosely attract but can pass through each other
    let cohesionForceX = 0;
    let cohesionForceY = 0;
    const nearbyParticles = allParticles.filter(
      (p) => p !== this && Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2) < cohesionDistance,
    );

    nearbyParticles.forEach((particle) => {
      const dx = particle.x - this.x;
      const dy = particle.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        // Very weak attraction - allows particles to pass over each other
        // Only attract when moderately far apart, repel slightly when very close
        if (distance < 8) {
          // Slight repulsion when too close to prevent clumping
          const repulsionStrength = ((8 - distance) / 8) * 0.001;
          cohesionForceX -= (dx / distance) * repulsionStrength;
          cohesionForceY -= (dy / distance) * repulsionStrength;
        } else {
          // Very weak attraction only when moderately separated
          const attractionStrength = (1 - (distance - 8) / (cohesionDistance - 8)) * this.surfaceTension * 0.0005;
          cohesionForceX += (dx / distance) * attractionStrength;
          cohesionForceY += (dy / distance) * attractionStrength;
        }
      }
    });

    this.vx += cohesionForceX;
    this.vy += cohesionForceY;

    // Check if liquid is at rest (no scroll activity for 0.7 seconds)
    const timeSinceLastScroll = (Date.now() - lastScrollActivity) / 1000; // Convert to seconds
    const isAtRest = timeSinceLastScroll > 0.7; // At rest after 0.7 seconds of no scrolling

    // Apply scroll-based forces - temporary effects that fade quickly
    const scrollForceX = scrollVelocity.x * 0.008; // Reduced for less extreme movement
    this.vx += scrollForceX;

    // Vertical scroll affects Y velocity - scrolling DOWN pushes particles DOWN (temporary)
    const scrollForceY = scrollVelocity.y * 0.01; // Removed negative - scroll direction matches movement
    this.vy += scrollForceY;

    // Apply acceleration effects for more dynamic response to scroll changes (temporary)
    const accelerationForceX = scrollAcceleration.x * 0.005; // Reduced
    const accelerationForceY = scrollAcceleration.y * 0.008; // Removed negative - acceleration matches direction
    this.vx += accelerationForceX;
    this.vy += accelerationForceY;

    // Always apply gentle pull toward middle for equilibrium (stronger when at rest)
    const middleY = height / 2;
    const distanceFromMiddle = middleY - this.y;
    const baseEquilibriumStrength = 0.008; // Constant gentle pull toward middle
    const restEquilibriumStrength = 0.02; // Stronger pull when at rest

    if (isAtRest) {
      // Strong settling force toward middle when at rest (after 2 seconds)
      this.vy += distanceFromMiddle * restEquilibriumStrength;

      // Reduce other forces when settling
      this.vx *= 0.98; // Extra damping for X movement when settling
    } else {
      // Always pull toward middle, even while scrolling (weaker) - creates equilibrium
      this.vy += distanceFromMiddle * baseEquilibriumStrength;

      // Create subtle wave propagation effect (only when scrolling)
      const normalizedX = this.x / width;
      const waveEffect = Math.sin(normalizedX * Math.PI * 3 + time * 0.8) * scrollVelocity.x * 0.005; // Reduced
      this.vy += waveEffect;

      // Very weak gravity effect when scrolling
      const gravityStrength = this.connections.length > 2 ? 0.0005 : 0.0015;
      this.vy += gravityStrength;
    }

    // Viscosity damping - liquid resistance
    this.vx *= 1 - this.viscosity * 0.1;
    this.vy *= 1 - this.viscosity * 0.1;

    // Calculate normalized Y position for Brownian motion (0 = top, 1 = bottom)
    const normalizedY = this.y / height;
    const surfaceFactor = Math.max(0, 1 - normalizedY * 1.5); // Stronger effect near top

    // Brownian motion - random molecular movement (stronger at surface)
    // Base Brownian motion for all particles
    const brownianStrength = 0.15 * (1 - normalizedY); // Stronger at top
    const brownianX = (Math.random() - 0.5) * brownianStrength;
    const brownianY = (Math.random() - 0.5) * brownianStrength;

    // Apply Brownian motion forces
    this.vx += brownianX;
    this.vy += brownianY;

    // Additional Brownian motion for surface particles (top level)
    if (surfaceFactor > 0) {
      // More pronounced Brownian motion at the surface
      const surfaceBrownianX = (Math.random() - 0.5) * 0.2 * surfaceFactor;
      const surfaceBrownianY = (Math.random() - 0.5) * 0.2 * surfaceFactor;
      this.vx += surfaceBrownianX;
      this.vy += surfaceBrownianY;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Very weak surface tension - allows particles to flow past each other
    if (this.connections.length > 0) {
      const avgX = this.connections.reduce((sum, p) => sum + p.x, 0) / this.connections.length;
      const avgY = this.connections.reduce((sum, p) => sum + p.y, 0) / this.connections.length;

      // Much weaker attraction - particles can pass through each other
      const surfaceTensionX = (avgX - this.x) * 0.002 * this.surfaceTension;
      const surfaceTensionY = (avgY - this.y) * 0.002 * this.surfaceTension;

      this.vx += surfaceTensionX;
      this.vy += surfaceTensionY;
    }

    // Bounce off left wall (invisible barrier at x = 0)
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -0.8; // Damping
    }

    // Bounce off right wall (invisible barrier at progress width)
    const rightBoundary = (width * progress) / 100;
    if (this.x > rightBoundary - this.radius) {
      this.x = rightBoundary - this.radius;
      this.vx *= -0.8;
    }

    // Bounce off top (invisible barrier)
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -0.8;
    }
    // Softer bottom boundary - particles can float above it
    if (this.y > height - this.radius - 2) {
      this.y = height - this.radius - 2;
      this.vy *= -0.6; // Less bounce, more floaty
    }

    if (!isAtRest) {
      // Natural liquid turbulence (very subtle) - only when scrolling
      const turbulenceX = Math.sin(time * 0.3 + this.y * 0.2) * 0.008;
      const turbulenceY = Math.cos(time * 0.4 + this.x * 0.15) * 0.008;
      this.vx += turbulenceX;
      this.vy += turbulenceY;
    }

    // Final damping for smooth liquid flow (stronger when at rest)
    // Less damping for surface particles to allow more Brownian motion
    const surfaceDamping = normalizedY < 0.3 ? 0.95 : 1.0; // Less damping at surface
    const dampingFactor = isAtRest ? 0.88 : 0.92; // More damping when settling
    this.vx *= dampingFactor * surfaceDamping;
    this.vy *= dampingFactor * surfaceDamping;

    // Update baseY for floating effect - allow particles to float freely
    // Particles can move up and down naturally without being constrained to bottom
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Create gradient for 3D voxel effect
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.7, this.color);
    gradient.addColorStop(1, `hsla(60, 100%, 40%, 0.4)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add highlight for 3D voxel effect
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();

    // Add subtle glow around voxels
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(220, 255, 7, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export function JuiceBarProgress({ currentStep, steps }: JuiceBarProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<LiquidParticle[]>([]);
  const [, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocityRef = useRef({ x: 0, y: 0 });
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const lastScrollActivityRef = useRef(Date.now()); // Track when scrolling last occurred
  const scrollAccelerationRef = useRef({ x: 0, y: 0 }); // Track scroll acceleration

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / stepOrder.length) * 100;

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current)
      return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = 32; // Fixed height for the bar

    canvas.width = width;
    canvas.height = height;
    // Store container size for potential future use
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setContainerSize({ width, height });

    // Create particles based on progress - increased density for fuller bar
    const particleCount = Math.floor((width * height * progressPercentage) / 6000); // Increased from 10000 to 6000 for more particles
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles more evenly across the filled area
      const x = Math.random() * ((width * progressPercentage) / 100);
      // Fill more of the vertical space, but keep some variation
      const y = height * 0.3 + Math.random() * height * 0.5; // Fill middle 50% of height with some variation
      particlesRef.current.push(new LiquidParticle(x, y, width, height));
    }
  }, [progressPercentage]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progressWidth = (canvas.width * progressPercentage) / 100;

      // Get current time for liquid effects
      const time = Date.now() * 0.001;

      // Update particles first to get their positions
      particlesRef.current.forEach((particle) => {
        particle.update(
          canvas.width,
          canvas.height,
          progressPercentage,
          particlesRef.current,
          scrollVelocityRef.current,
          scrollAccelerationRef.current,
          time,
          lastScrollActivityRef.current,
        );
      });

      // Draw dynamic fill connecting all voxels
      if (particlesRef.current.length > 0) {
        // Sort particles by X position for proper fill order
        const sortedParticles = [...particlesRef.current].sort((a, b) => a.x - b.x);

        // Calculate step marker connection points (75% height of 24px icon = 18px from top)
        const iconHeight = 24;
        const _connectionPointY = iconHeight * 0.75; // 75% of icon height
        const stepMarkerPositions = stepOrder.map((_, index) => {
          const stepPosition = ((index + 1) / stepOrder.length) * 100;
          const x = (canvas.width * stepPosition) / 100;
          return { x, y: _connectionPointY };
        });

        // Create a blob/mesh that connects all particles using convex hull approach
        ctx.beginPath();

        // Find the bottom boundary (lowest point of all particles)
        const bottomY = Math.max(...sortedParticles.map((p) => p.y + p.radius), canvas.height - 4);

        // Start from bottom left, below the lowest particle
        ctx.moveTo(0, Math.min(bottomY + 2, canvas.height));

        // Create bottom curve connecting particles
        for (let i = 0; i < sortedParticles.length; i++) {
          const particle = sortedParticles[i];
          const nextParticle = sortedParticles[i + 1];

          if (nextParticle) {
            // Connect particles smoothly, allowing them to float
            const midX = (particle.x + nextParticle.x) / 2;
            const bottomPointY = Math.max(particle.y + particle.radius, nextParticle.y + nextParticle.radius);
            ctx.quadraticCurveTo(particle.x, particle.y + particle.radius, midX, bottomPointY);
          } else {
            // Last particle - connect to right edge
            ctx.quadraticCurveTo(
              particle.x,
              particle.y + particle.radius,
              progressWidth,
              Math.min(bottomY + 2, canvas.height),
            );
          }
        }

        // Connect to right edge
        ctx.lineTo(progressWidth, Math.min(bottomY + 2, canvas.height));

        // Create top curve connecting particles (from right to left)
        // First, connect to step markers at their connection points
        for (let i = stepMarkerPositions.length - 1; i >= 0; i--) {
          const marker = stepMarkerPositions[i];
          // Only connect markers that are within the progress width
          if (marker.x <= progressWidth) {
            if (i === stepMarkerPositions.length - 1) {
              // Last marker - start from right edge
              ctx.lineTo(progressWidth, marker.y);
            }
            // Connect to marker at 75% height
            ctx.lineTo(marker.x, marker.y);
          }
        }

        // Then connect particles from right to left with smooth liquid surface
        for (let i = sortedParticles.length - 1; i >= 0; i--) {
          const particle = sortedParticles[i];
          const prevParticle = sortedParticles[i - 1];

          if (prevParticle) {
            const midX = (particle.x + prevParticle.x) / 2;
            const topPointY = Math.min(particle.y - particle.radius, prevParticle.y - prevParticle.radius);

            // Add subtle surface ripple for liquid effect
            const surfaceRipple = Math.sin((particle.x / progressWidth) * Math.PI * 3 + time * 1.2) * 0.8;
            const smoothTopY = topPointY + surfaceRipple;

            ctx.quadraticCurveTo(particle.x, particle.y - particle.radius, midX, smoothTopY);
          } else {
            // First particle - connect back to start
            ctx.quadraticCurveTo(particle.x, particle.y - particle.radius, 0, Math.min(bottomY + 2, canvas.height));
          }
        }

        ctx.closePath();

        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(220, 255, 7, 0.9)");
        gradient.addColorStop(0.5, "rgba(200, 255, 0, 0.85)");
        gradient.addColorStop(1, "rgba(180, 255, 0, 0.9)");

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(220, 255, 7, 0.7)";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw darker bottom layer for depth (only bottom portion)
        const bottomYDepth = Math.max(...sortedParticles.map((p) => p.y + p.radius), canvas.height - 4);
        ctx.beginPath();
        ctx.moveTo(0, Math.min(bottomYDepth + 2, canvas.height));
        for (let i = 0; i < sortedParticles.length; i++) {
          const particle = sortedParticles[i];
          const nextParticle = sortedParticles[i + 1];

          if (nextParticle) {
            const midX = (particle.x + nextParticle.x) / 2;
            const bottomPointY = Math.max(particle.y + particle.radius, nextParticle.y + nextParticle.radius);
            ctx.quadraticCurveTo(particle.x, particle.y + particle.radius, midX, bottomPointY);
          } else {
            ctx.quadraticCurveTo(
              particle.x,
              particle.y + particle.radius,
              progressWidth,
              Math.min(bottomYDepth + 2, canvas.height),
            );
          }
        }
        ctx.lineTo(progressWidth, Math.min(bottomYDepth + 2, canvas.height));
        ctx.lineTo(progressWidth, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = "rgba(150, 200, 0, 0.4)";
        ctx.fill();
      }

      // Draw particles on top (voxels)
      particlesRef.current.forEach((particle) => {
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progressPercentage]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current)
        return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = 32;

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      // Store container size for potential future use
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setContainerSize({ width, height });

      // Recreate particles on resize - increased density for fuller bar
      const particleCount = Math.floor((width * height * progressPercentage) / 6000); // Increased from 10000 to 6000
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * ((width * progressPercentage) / 100);
        // Fill more of the vertical space
        const y = height * 0.3 + Math.random() * height * 0.5; // Fill middle 50% of height
        particlesRef.current.push(new LiquidParticle(x, y, width, height));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [progressPercentage]);

  // Scroll event listener for physics
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTimeRef.current;

      if (timeDelta > 0) {
        // Calculate scroll velocity
        const scrollDeltaY = currentScrollY - lastScrollYRef.current;
        const velocityY = scrollDeltaY / timeDelta; // pixels per millisecond

        // Calculate acceleration (change in velocity)
        const previousVelocityY = scrollVelocityRef.current.y;
        const currentVelocityY = velocityY * 200;
        scrollAccelerationRef.current.y = (currentVelocityY - previousVelocityY) / timeDelta;
        scrollAccelerationRef.current.x = 0; // Can add horizontal acceleration if needed

        // Update scroll velocity with very low sensitivity
        scrollVelocityRef.current.y = currentVelocityY;
        scrollVelocityRef.current.x = 0; // Can add horizontal scroll if needed

        // Update last scroll activity time
        lastScrollActivityRef.current = currentTime;

        // Apply very strong damping to velocity over time for smooth movement
        scrollVelocityRef.current.y *= 0.75; // Very aggressive damping for smooth settling
        scrollVelocityRef.current.x *= 0.75;

        // Damp acceleration as well
        scrollAccelerationRef.current.y *= 0.8;
        scrollAccelerationRef.current.x *= 0.8;

        lastScrollYRef.current = currentScrollY;
        lastScrollTimeRef.current = currentTime;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("wheel", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("wheel", throttledScroll);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Juice Bar Container with outline */}
      <div
        ref={containerRef}
        className="relative h-8 w-full overflow-hidden rounded-full"
        style={{
          border: "1px solid rgba(220, 255, 7, 0.3)",
          boxShadow: "inset 0 0 10px rgba(220, 255, 7, 0.1), 0 0 20px rgba(220, 255, 7, 0.1)",
        }}
      >
        {/* 3D Liquid Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 h-full w-full"
          style={{
            transform: "perspective(100px) rotateX(5deg)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Subtle inner outline */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(220, 255, 7, 0.2)",
            boxShadow: "inset 0 1px 2px rgba(220, 255, 7, 0.15)",
          }}
        />

        {/* Step Markers - positioned above */}
        <div className="absolute inset-0 flex items-start justify-between px-2 pt-1">
          {stepOrder.map((step, index) => {
            const stepData = steps.find((s) => s.step === step);
            const isCompleted = stepData?.completed || false;
            const isCurrent = step === currentStep;
            const stepPosition = ((index + 1) / stepOrder.length) * 100;

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center"
                style={{ left: `calc(${stepPosition}% - 12px)` }}
              >
                <div
                  className={`h-6 w-6 rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "border-lime-400 bg-lime-400"
                      : isCurrent
                        ? "border-lime-400 bg-black ring-2 ring-lime-400 ring-offset-2 ring-offset-black"
                        : "border-gray-600 bg-gray-800"
                  }`}
                >
                  {isCompleted && (
                    <svg className="h-full w-full text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Labels Below */}
      <div className="relative mt-2 flex justify-between px-2">
        {stepOrder.map((step, _index) => {
          const stepData = steps.find((s) => s.step === step);
          const isCompleted = stepData?.completed || false;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center" style={{ width: `${100 / stepOrder.length}%` }}>
              <span className={`text-xs font-medium ${isCurrent || isCompleted ? "text-lime-400" : "text-gray-500"}`}>
                {stepLabels[step]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Current Step: <span className="font-semibold text-lime-400">{stepLabels[currentStep]}</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {currentStepIndex + 1} of {stepOrder.length} steps completed
        </p>
      </div>
    </div>
  );
}
