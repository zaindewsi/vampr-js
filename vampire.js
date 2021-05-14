class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let vamp = this;

    while (vamp.creator) {
      vamp = vamp.creator;
      num++;
    }

    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let vamp = this;

    if (
      vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal
    )
      return true;

    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const vampName = [];
    let current = this;

    if (current === vampire) {
      return current;
    }

    if (!current.creator || vampire.creator === current) {
      return current;
    }

    if (!vampire.creator || current.creator === vampire) {
      return vampire;
    }

    while (current.creator) {
      vampName.push(current.creator.name);
      current = current.creator;
    }

    while (vampire.creator) {
      if (vampName.includes(vampire.creator.name)) {
        return vampire.creator;
      }
      vampire = vampire.creator;
    }
  }
}

module.exports = Vampire;
