package com.funkyformer.nrpartyfinder;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.type.StandardBasicTypes;

public class REGEXContributor implements FunctionContributor {

    @Override
    public void contributeFunctions(FunctionContributions contr) {
        contr.getFunctionRegistry().registerPattern("custom_regex", "?1 REGEXP ?2",
        contr.getTypeConfiguration().getBasicTypeRegistry().resolve(StandardBasicTypes.BOOLEAN));
    }
    
}
