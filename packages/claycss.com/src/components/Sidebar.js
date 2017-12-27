'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import Toggler from 'metal-toggler';
import { Storage, LocalStorageMechanism } from 'metal-storage';

import templates from './Sidebar.soy';

class Sidebar extends Component {
	attached() {
		Toggler.CSS_EXPANDED = 'open'; /* Until metal-toggler can manage classenames on states */

		this._toggler = new Toggler({
			content: '.sidebar-toggler-content',
			header: '.sidebar-toggler'
		});

		this.createStorage_();

		this.setAtlasFromStorage_();
	}

	disposed() {
		this._toggler.dispose();
	}

	createStorage_() {
		this.mechanism = new LocalStorageMechanism();

		this.storage = new Storage(this.mechanism);
	}

	handleThemeChange_({target}) {
		this.storage.set('atlas', target.checked);

		this.atlas = target.checked;
	}

	setAtlas_(value) {
		const linkTag = document.getElementById('mainCssLink');

		let href = '/styles/main.css';

		if (!value) {
			href = '/styles/clay_base.css';
		}

		if (linkTag.getAttribute('href') !== href) {
			linkTag.setAttribute('href', href);
		}

		return value;
	}

	setAtlasFromStorage_() {
		const atlas = this.storage.get('atlas');

		if (atlas !== undefined) {
			this.atlas = atlas;
		}
	}
};

Sidebar.STATE = {
	atlas: {
		value: true,
		setter: 'setAtlas_'
	}
};

Soy.register(Sidebar, templates);

export default Sidebar;
