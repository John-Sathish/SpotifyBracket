import React from 'react';
import { render } from '@testing-library/react';
import RoundDiv from "../src/RoundDiv"

describe('RoundDiv Component', () => {
    it('renders without errors', () => {
        const children = [
            <img key={0} src="album1.jpg" alt="Album 1" />,
            <img key={1} src="album2.jpg" alt="Album 2" />,
            <img key={2} src="album3.jpg" alt="Album 3" />
          ];
        
        const numAlbums = 3;

        expect(render(<RoundDiv children={children} numAlbums={numAlbums} />)).toBeTruthy();
    });

    it('renders without errors with no children', () => {
        expect(render(<RoundDiv children={[]} numAlbums={0} />)).toBeTruthy();
    });
});