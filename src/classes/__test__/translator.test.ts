import Translator from '../translator';

const params = {
  lanaugeCodes: ['en', 'ko'],
  selector: '#result',
  toUrl: (from: string, to: string, value: string) =>
    `https://example.com/?sl=${from}&tl=${to}&text=${value}`,
};

test('constructor', () => {
  const translator = new Translator(params, {
    beforeTranslate: 'console.log("beforeTranslate")',
    userAgent: 'test user agent',
  });

  expect(translator.lanaugeCodes).toStrictEqual(['en', 'ko']);
  expect(translator.selector).toBe('#result');
  expect(translator.userAgent).toBe('test user agent');
  expect(translator.beforeTranslate).toBe('console.log("beforeTranslate")');
  expect(translator.toUrl('en', 'ko', 'hello')).toBe(
    'https://example.com/?sl=en&tl=ko&text=hello',
  );
});

test('getInjectedJavascript', () => {
  const translator = new Translator(params, {
    beforeTranslate: 'console.log("beforeTranslate")',
  });

  const injectedJavascript = translator.getInjectedJavascript();
  expect(injectedJavascript).toMatchSnapshot();
  expect(injectedJavascript).toContain('console.log("beforeTranslate")'); // beforeTranslate
  expect(injectedJavascript).toContain('#result'); // selector
});

test('getInjectedJavascript without beforeTranslate', () => {
  const translator = new Translator(params);
  const injectedJavascript = translator.getInjectedJavascript();
  expect(injectedJavascript).not.toContain('console.log("beforeTranslate")');
});
