"use client";
import { useState, useEffect, useRef, useImperativeHandle, forwardRef, ReactNode, useMemo } from "react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Handle interface exposed to the parent component via ref.
 * Allows parent components to programmatically control the carousel.
 */
export type CarouselHandle = {
    next: () => void;
    prev: () => void;
};

/**
 * Props for the Carousel component.
 * The type of items in the carousel.
 */
type CarouselProps<T> = {
    /** Array of items to display in the carousel */
    items: T[];
    /** Function to render each item */
    renderItem: (item: T, index?: number, renderIndex?: number) => ReactNode;
    /** Number of items to show per view (required) */
    itemsPerView: number;
    /** Enable auto-play functionality (default: true) */
    autoPlay?: boolean;
    /** Auto-play interval in milliseconds (default: 3000) */
    interval?: number;
    /** Pause autoplay on hover (default: false) */
    pauseOnHover?: boolean;
    /** External control to pause autoplay */
    isPaused?: boolean;
    /** Notify parent when the active (logical) item index changes */
    onIndexChange?: (index: number) => void;
    /** Notify parent when the internal track index (clone-aware) changes */
    onTrackIndexChange?: (trackIndex: number) => void;
};

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Minimum number of buffer items to support rapid clicking.
 * This ensures we have enough cloned items to handle fast user interactions
 * without running out of buffer space.
 */
const MIN_BUFFER_ITEMS = 50;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * A reusable, infinite-scrolling carousel component.
 *
 * Features:
 * - Infinite scrolling using cloned item sets
 * - Responsive design (1 item on mobile, 4 on desktop)
 * - Touch/swipe gestures for mobile
 * - Auto-play with configurable interval
 * - Exposes navigation methods via ref
 *
 * How it works:
 * The carousel creates multiple copies (clones) of the items array to create
 * an infinite scrolling illusion. It starts in the "middle" set of clones.
 * When the user scrolls to the edges, it silently jumps back to the middle
 * without animation, creating a seamless loop.
 */
const Carousel = forwardRef<CarouselHandle, CarouselProps<any>>(
    ({ items, renderItem, itemsPerView, autoPlay = true, interval = 3000, pauseOnHover = false, isPaused = false, onIndexChange, onTrackIndexChange }, ref) => {
    // ========================================================================
    // COMPUTED VALUES (Infinite Scroll Clones Logic)
    // ========================================================================

    /**
     * Calculate how many sets of clones we need.
     * We need enough clones to support rapid clicking (at least MIN_BUFFER_ITEMS).
     * Each "set" is a full copy of the items array.
     */
    const CLONE_SETS = useMemo(() => {
        if (items.length === 0) return 2;
        return Math.max(2, Math.ceil(MIN_BUFFER_ITEMS / items.length));
    }, [items.length]);

    /**
     * The starting index (beginning of the middle set).
     * This is where we initialize the carousel and where we jump back to
     * when we've scrolled too far in either direction.
     *
     * Computed synchronously since it's needed for useState initialization.
     */
    const START_INDEX = items.length * CLONE_SETS;

    /**
     * Create the track structure: [Previous Clones] + [Middle Set] + [Next Clones]
     *
     * Structure:
     * - Previous Clones: CLONE_SETS copies (for scrolling backward)
     * - Middle Set: 1 copy (the "real" items we start at)
     * - Next Clones: CLONE_SETS copies (for scrolling forward)
     *
     * Example with 4 items and CLONE_SETS=2:
     * [A,B,C,D, A,B,C,D, A,B,C,D, A,B,C,D, A,B,C,D]
     *  ^prev^   ^prev^   ^middle^ ^next^   ^next^
     *
     * We start at the beginning of the middle set. If we scroll too far in either
     * direction, we jump back to the equivalent position in the middle set.
     */
    const itemsToRender = useMemo(() => {
        if (items.length === 0) return [];

        const previousClones: any[] = [];
        const nextClones: any[] = [];

        // Create previous clones (for backward scrolling)
        for (let i = 0; i < CLONE_SETS; i++) {
            previousClones.push(...items);
        }

        // Create next clones (for forward scrolling)
        for (let i = 0; i < CLONE_SETS; i++) {
            nextClones.push(...items);
        }

        // Combine: [Previous] + [Middle] + [Next]
        return [...previousClones, ...items, ...nextClones];
    }, [items, CLONE_SETS]);

    // ========================================================================
    // STATE
    // ========================================================================

    /** Number of items visible per screen (set from itemsPerView prop) */
    const [itemsToShow, setItemsToShow] = useState(itemsPerView);

    /** Current position index in the track (controls translateX) */
    const [trackIndex, setTrackIndex] = useState(START_INDEX);

    /** Whether CSS transitions are enabled (false = instant jump, true = smooth slide) */
    const [animate, setAnimate] = useState(true);

    /** Whether the carousel is currently hovered (for pause on hover) */
    const [isHovered, setIsHovered] = useState(false);

    /** Touch start position for swipe gesture detection */
    const touchStartX = useRef<number | null>(null);
    /** Touch end position for swipe gesture detection */
    const touchEndX = useRef<number | null>(null);

    // ========================================================================
    // NAVIGATION HANDLERS
    // ========================================================================

    /**
     * Move to the next item.
     * Increments trackIndex, which triggers a CSS transform to slide the track.
     * The transitionEnd handler will reset us back to the middle if we go too far.
     */
    const handleNext = () => {
        setAnimate(true);
        setTrackIndex((prev) => prev + 1);
    };

    /**
     * Move to the previous item.
     * Decrements trackIndex, which triggers a CSS transform to slide the track.
     * The transitionEnd handler will reset us back to the middle if we go too far.
     */
    const handlePrev = () => {
        setAnimate(true);
        setTrackIndex((prev) => prev - 1);
    };

    // ========================================================================
    // TOUCH/SWIPE HANDLERS
    // ========================================================================

    /**
     * Record the starting X position when user touches the screen.
     */
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    /**
     * Update the ending X position as user moves their finger.
     */
    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    /**
     * Detect swipe gesture and navigate accordingly.
     * Swipe right (distance > 50px) = go to next
     * Swipe left (distance < -50px) = go to previous
     */
    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const SWIPE_THRESHOLD = 50;

        if (distance > SWIPE_THRESHOLD) {
            // Swiped right → go to next
            handleNext();
        } else if (distance < -SWIPE_THRESHOLD) {
            // Swiped left → go to previous
            handlePrev();
        }

        // Reset touch positions
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // ========================================================================
    // TRANSITION HANDLER (Infinite Scroll Magic)
    // ========================================================================

    /**
     * Handle the end of a CSS transition.
     * This is where the "infinite scroll" illusion is maintained.
     *
     * When the user scrolls outside the safe middle zone, we:
     * 1. Disable animations (to make the jump invisible)
     * 2. Calculate which item in the middle set corresponds to our current position
     * 3. Jump back to that position in the middle set
     *
     * The user never sees this jump because it happens after the transition ends
     * and animations are disabled.
     */
    const handleTransitionEnd = () => {
        const safeZoneStart = START_INDEX;
        const safeZoneEnd = START_INDEX + items.length;

        // Check if we've drifted outside the safe middle zone
        if (trackIndex < safeZoneStart || trackIndex >= safeZoneEnd) {
            // Disable animations for the jump
            setAnimate(false);

            /**
             * Calculate which item in the middle set we should be at.
             *
             * Example: If we're at index 25 and items.length is 4:
             * - relativeOffset = ((25 - 20) % 4 + 4) % 4 = (5 % 4 + 4) % 4 = (1 + 4) % 4 = 1
             * - So we jump to START_INDEX + 1 (the second item in the middle set)
             *
             * The double modulo handles negative numbers correctly:
             * - If trackIndex is 19: ((19 - 20) % 4 + 4) % 4 = (-1 + 4) % 4 = 3
             */
            const relativeOffset = (((trackIndex - START_INDEX) % items.length) + items.length) % items.length;

            // Jump back to the equivalent position in the middle set
            setTrackIndex(START_INDEX + relativeOffset);
        }
    };

    // ========================================================================
    // EFFECTS
    // ========================================================================

    /**
     * Set itemsToShow based on itemsPerView prop.
     * itemsPerView is required and always used.
     */
    useEffect(() => {
        setItemsToShow(itemsPerView);
    }, [itemsPerView]);

    /**
     * Reset track position when itemsToShow or items change (e.g., window resize or data update).
     * This prevents layout issues when switching between mobile/desktop views.
     */
    useEffect(() => {
        const newStartIndex = items.length * CLONE_SETS;
        setTrackIndex(newStartIndex);
    }, [itemsToShow, items.length, CLONE_SETS]);

    /**
     * Notify parent of the current logical index (0..items.length-1).
     * This stays correct even with clone sets and track resets.
     */
    useEffect(() => {
        if (!onIndexChange || items.length === 0) return;
        const relativeOffset = (((trackIndex - START_INDEX) % items.length) + items.length) % items.length;
        onIndexChange(relativeOffset);
    }, [onIndexChange, trackIndex, items.length, START_INDEX]);

    /**
     * Notify parent of the clone-aware track index.
     * Useful when the parent needs a stable identifier for the currently visible clone.
     */
    useEffect(() => {
        if (!onTrackIndexChange) return;
        onTrackIndexChange(trackIndex);
    }, [onTrackIndexChange, trackIndex]);

    /**
     * Auto-play: automatically advance to next item at specified interval.
     * Pauses if autoPlay is disabled, if hovered (and pauseOnHover is true), or if externally paused.
     */
    useEffect(() => {
        if (!autoPlay || isPaused || (pauseOnHover && isHovered)) return;

        const intervalId = setInterval(handleNext, interval);
        return () => clearInterval(intervalId);
    }, [autoPlay, interval, trackIndex, pauseOnHover, isHovered, isPaused]);

    /**
     * If the carousel is programmatically disabled (e.g. section scrolled out of view),
     * we may never receive a mouseleave to clear hover state. Reset it so autoplay can
     * resume cleanly when re-enabled.
     */
    useEffect(() => {
        if (!autoPlay) setIsHovered(false);
    }, [autoPlay]);

    /**
     * Expose navigation methods to parent component via ref.
     * Allows parent to programmatically control the carousel.
     */
    useImperativeHandle(ref, () => ({
        next: handleNext,
        prev: handlePrev,
    }));

    // ========================================================================
    // RENDER
    // ========================================================================

    if (items.length === 0) {
        return null;
    }

    /**
     * Calculate the percentage each item takes up in the track.
     * If we have 20 items total, each item is 100% / 20 = 5% of the track width.
     */
    const itemWidthPercent = 100 / itemsToRender.length;

    /**
     * Calculate how much to translate the track.
     * If trackIndex is 5 and each item is 5% wide, we translate by -25% (5 * 5%).
     */
    const translateXPercent = trackIndex * itemWidthPercent;

    /**
     * Calculate the total track width.
     * If itemsToShow is 4, one "screen" is 100% wide.
     * If we have 20 items, the track needs to be (20 / 4) * 100% = 500% wide.
     */
    const trackWidthPercent = (itemsToRender.length / itemsToShow) * 100;

    return (
        <div 
            className="relative overflow-hidden w-full touch-pan-y" 
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove} 
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => pauseOnHover && setIsHovered(true)}
            onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        >
            <div
                className="flex"
                onTransitionEnd={handleTransitionEnd}
                style={{
                    transform: `translateX(-${translateXPercent}%)`,
                    transition: animate ? "transform 500ms ease-in-out" : "none",
                    width: `${trackWidthPercent}%`,
                }}
            >
                {itemsToRender.map((item: any, index: number) => {
                    // Calculate the actual item index (modulo to get original item index)
                    const actualIndex = index % items.length;
                    return (
                        <div key={index} style={{ width: `${itemWidthPercent}%` }} className="flex-shrink-0">
                            {renderItem(item, actualIndex, index)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
    }
);

Carousel.displayName = "Carousel";

export default Carousel;
