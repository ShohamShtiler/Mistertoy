import { BranchMap } from '../cmps/BranchMap'

export function AboutUs() {
    return (
      <section className="about-us main-layout">
      <h1>About Mister Toy</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer vel lacus id leo pulvinar iaculis. Duis malesuada porta orci, 
          in ultrices sapien tincidunt ac. Donec tristique bibendum nunc non volutpat.
          Cras convallis, nunc at fermentum finibus, nisl nisi volutpat nulla, 
          in efficitur purus mauris eget sapien. Nam efficitur sem at elit dapibus,
          nec tristique elit malesuada.
        </p>
        <BranchMap />
      </section>
    )
  }