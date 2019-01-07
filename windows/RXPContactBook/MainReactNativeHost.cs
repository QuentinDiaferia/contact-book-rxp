using ReactNative;
using ReactNative.Modules.Core;
using Org.PGSQLite.SQLitePlugin;
using ReactNative.Shell;
using System.Collections.Generic;
using Org.PGSQLite.SQLitePlugin;

namespace RXPContactBook
{
    class MainReactNativeHost : ReactNativeHost
    {
        public override string MainComponentName => "RXApp";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index.native";

#if BUNDLE
        protected override string JavaScriptBundleFile => "ms-appx:///ReactAssets/index.windows.bundle";
#endif

        protected override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new SQLitePluginPackage(),
            new SQLitePluginPackage(),
        };
    }
}
