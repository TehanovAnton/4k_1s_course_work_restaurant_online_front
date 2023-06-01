export class ButtonSetting {
  constructor(label, enable, callback) {
    this.label = label
    this.enable = enable
    this.callback = callback
  }

  setAttribute(attr, value) {
    this[attr] = value
  }
}